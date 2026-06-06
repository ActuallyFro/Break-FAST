#!/bin/bash

TARGET_HTML="index.html"
OUTPUT_HTML="dist_index.html"
BUNDLE_DIR="ZZ_Bundled-App"
mkdir -p $BUNDLE_DIR

echo "=== Starting SPA GraphML Single-File Compiler ==="

if [ ! -f "$TARGET_HTML" ]; then
    echo "Error: Base target file '$TARGET_HTML' not found in this workspace context."
    exit 1
fi

# Clear or create the clean compilation output target
> "$OUTPUT_HTML"

echo "Parsing index layout and inlining local dependencies..."

while IFS= read -r line || [ -n "$line" ]; do

    # -------------------------------------------------------------------------
    # 1. Match local stylesheets (styles/...)
    # -------------------------------------------------------------------------
    if [[ "$line" =~ \<link.*href=\"\.\/styles\/([^\"]+)\" ]]; then

        CSS_FILE="styles/${BASH_REMATCH[1]}"

        echo " -> Inlining Stylesheet: $CSS_FILE"

        cat >> "$OUTPUT_HTML" <<EOF
<!-- ====================================================================== -->
<!-- START BUNDLED FILE: $CSS_FILE -->
<!-- ====================================================================== -->
<style>
EOF

        if [ -f "$CSS_FILE" ]; then
            cat "$CSS_FILE" >> "$OUTPUT_HTML"
        else
            echo "/* [WARNING] Missing file: $CSS_FILE */" >> "$OUTPUT_HTML"
            echo "     [WARNING] Missing file: $CSS_FILE"
        fi

        cat >> "$OUTPUT_HTML" <<EOF
</style>
<!-- ====================================================================== -->
<!-- END BUNDLED FILE: $CSS_FILE -->
<!-- ====================================================================== -->

EOF

    # -------------------------------------------------------------------------
    # 2. Match submodule tracking dependencies (scripts/SJFI/...)
    # -------------------------------------------------------------------------
    elif [[ "$line" =~ \<script.*src=\"\.\/scripts\/SJFI\/([^\"]+)\" ]]; then

        JS_SUB_FILE="scripts/SJFI/${BASH_REMATCH[1]}"

        echo " -> Inlining Submodule Core: $JS_SUB_FILE"

        cat >> "$OUTPUT_HTML" <<EOF
<!-- ====================================================================== -->
<!-- START BUNDLED FILE: $JS_SUB_FILE -->
<!-- ====================================================================== -->
<script type="text/javascript">
EOF

        if [ -f "$JS_SUB_FILE" ]; then
            cat "$JS_SUB_FILE" >> "$OUTPUT_HTML"
        else
            echo "// [WARNING] Missing file: $JS_SUB_FILE" >> "$OUTPUT_HTML"
            echo "     [WARNING] Missing tracking asset: $JS_SUB_FILE"
        fi

        cat >> "$OUTPUT_HTML" <<EOF
</script>
<!-- ====================================================================== -->
<!-- END BUNDLED FILE: $JS_SUB_FILE -->
<!-- ====================================================================== -->

EOF

    # -------------------------------------------------------------------------
    # 3. Match native structural app scripts (scripts/...)
    # -------------------------------------------------------------------------
    elif [[ "$line" =~ \<script.*src=\"\.\/scripts\/([^\"]+)\" ]]; then

        JS_FILE="scripts/${BASH_REMATCH[1]}"

        echo " -> Inlining App Script: $JS_FILE"

        cat >> "$OUTPUT_HTML" <<EOF
<!-- ====================================================================== -->
<!-- START BUNDLED FILE: $JS_FILE -->
<!-- ====================================================================== -->
<script type="text/javascript">
EOF

        if [ -f "$JS_FILE" ]; then

            # Special transformation for graphRendering.js
            if [[ "$JS_FILE" == *"graphRendering.js" ]]; then

                echo "     [Transforming] Patching theme-overrides within rendering canvas loop..."

                sed \
                    -e "s/\.style('stroke', 'black')/\/* .style('stroke', 'black') *\/ \.style('stroke', 'var(--bs-heading-color)')/g" \
                    -e "s/d3\.selectAll('\.label')\.style('fill', window\.SJFI_data\.labelColor);/\/* Swapped hardcoded text fill for dynamic theme-aware variable tokens *\/ if (window.SJFI_data.labelColor \&\& window.SJFI_data.labelColor !== 'black' \&\& window.SJFI_data.labelColor !== 'white') { d3.selectAll('.label').style('fill', window.SJFI_data.labelColor); } else { d3.selectAll('.label').style('fill', 'var(--bs-body-color)'); }/g" \
                    "$JS_FILE" >> "$OUTPUT_HTML"

            else
                cat "$JS_FILE" >> "$OUTPUT_HTML"
            fi

        else
            echo "// [WARNING] Missing file: $JS_FILE" >> "$OUTPUT_HTML"
            echo "     [WARNING] Missing file: $JS_FILE"
        fi

        cat >> "$OUTPUT_HTML" <<EOF
</script>
<!-- ====================================================================== -->
<!-- END BUNDLED FILE: $JS_FILE -->
<!-- ====================================================================== -->

EOF

    # -------------------------------------------------------------------------
    # Default passthrough
    # -------------------------------------------------------------------------
    else
        echo "$line" >> "$OUTPUT_HTML"
    fi

done < "$TARGET_HTML"

mkdir -p "$BUNDLE_DIR"
mv "$OUTPUT_HTML" "$BUNDLE_DIR/"

echo "=== Build Complete! Raw Output generated -> $BUNDLE_DIR/$OUTPUT_HTML ==="

###############################################################################
# OPTIONAL REMOTE DEPENDENCY AUDIT
###############################################################################

echo ""
echo "====================================================================="
echo "OPTIONAL: Generate Remote Dependency Audit Report?"
echo "This will scan for CDN/HTTP(S) dependencies and create:"
echo "  - DEPENDENCY-AUDIT.txt"
echo "  - (optional) MIGRATE-TO-OFFLINE.sh"
echo "====================================================================="
echo ""

read -rp "Run dependency audit? [y/N]: " RUN_DEP_AUDIT

if [[ ! "$RUN_DEP_AUDIT" =~ ^([yY]|[yY][eE][sS])$ ]]; then
    echo "Dependency audit skipped."
    echo "=== Build Complete! Raw Output generated -> $BUNDLE_DIR/$OUTPUT_HTML ==="
    exit 0
fi
###############################################################################
# REMOTE DEPENDENCY AUDIT REPORT (BUNDLED OUTPUT ONLY)
###############################################################################

REPORT_FILE="$BUNDLE_DIR/DEPENDENCY-AUDIT.txt"
SCAN_TARGET="$BUNDLE_DIR/$OUTPUT_HTML"

echo "" > "$REPORT_FILE"
echo "=====================================================================" >> "$REPORT_FILE"
echo "REMOTE DEPENDENCY AUDIT REPORT (POST-BUNDLE)" >> "$REPORT_FILE"
echo "Target File: $SCAN_TARGET" >> "$REPORT_FILE"
echo "Generated: $(date)" >> "$REPORT_FILE"
echo "=====================================================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "Scanning BUNDLED output for remaining remote dependencies..."

# Extract raw URLs only from final bundled HTML
grep -nE 'https?://' "$SCAN_TARGET" > /tmp/spa_dependency_scan.txt

if [ ! -s /tmp/spa_dependency_scan.txt ]; then
    echo "No remote dependencies found in bundled output." >> "$REPORT_FILE"
    echo "All assets appear to be fully local/offline." >> "$REPORT_FILE"

    echo "Dependency report written:"
    echo "  $REPORT_FILE"
    rm -f /tmp/spa_dependency_scan.txt
    exit 0
fi

while IFS= read -r hit; do

    FILE="$SCAN_TARGET"
    LINE=$(echo "$hit" | cut -d: -f1)

    URL=$(echo "$hit" | grep -oE 'https?://[^"'\'' )]+' | head -1)

    [ -z "$URL" ] && continue

    BASENAME=$(basename "${URL%%\?*}")

    if [[ -z "$BASENAME" ]]; then
        BASENAME="downloaded_asset"
    fi

    echo "-----------------------------------------------------------------" >> "$REPORT_FILE"
    echo "SOURCE FILE : $FILE" >> "$REPORT_FILE"
    echo "LINE NUMBER : $LINE" >> "$REPORT_FILE"
    echo "URL         : $URL" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    echo "Suggested download:" >> "$REPORT_FILE"
    echo "curl -L \"$URL\" -o external/$BASENAME" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

    echo "Likely replacement (if moving fully offline):" >> "$REPORT_FILE"
    echo "FROM: $URL" >> "$REPORT_FILE"
    echo "TO:   ./external/$BASENAME" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"

done < /tmp/spa_dependency_scan.txt

rm -f /tmp/spa_dependency_scan.txt

echo "Dependency report written:"
echo "  $REPORT_FILE"
