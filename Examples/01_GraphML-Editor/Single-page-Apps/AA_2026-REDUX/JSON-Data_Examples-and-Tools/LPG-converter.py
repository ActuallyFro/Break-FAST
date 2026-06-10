import json
import os

def migrate_to_new_lpg(old_file_path, output_file_path):
    # Read the original August 2025 graph structure
    with open(old_file_path, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
        
    new_nodes = []
    new_edges = []
    
    # Ingest layout objects from the flat old array
    graph_objects = old_data.get("graphObjects", [])
    
    for obj in graph_objects:
        obj_type = obj.get("type")
        
        if obj_type == "node":
            # Extract nested layout parameters safely
            render_settings = obj.get("renderSettings", [{}])[0] if obj.get("renderSettings") else {}
            
            # Map layout color fields
            color = render_settings.get("nodeColor") or render_settings.get("fillColor") or "#1f6feb"
            
            # Convert text layout sizes safely into standard native numbers
            r_val = render_settings.get("radiusSize", 28)
            try:
                r = float(r_val) if '.' in str(r_val) else int(r_val)
            except (ValueError, TypeError):
                r = 28
                
            fs_val = render_settings.get("labelFontSize")
            font_size = None
            if fs_val is not None:
                try:
                    font_size = float(fs_val) if '.' in str(fs_val) else int(fs_val)
                except (ValueError, TypeError):
                    font_size = None
            
            # Flatten property objects into a structural JSON dictionary map
            props = {}
            for prop in obj.get("properties", []):
                k = prop.get("key")
                v = prop.get("value")
                if k:
                    props[k] = v
                    
            # Assemble the new standard compliant node object
            new_node = {
                "id": obj.get("id"),
                "label": obj.get("label"),
                "x": obj.get("x"),
                "y": obj.get("y"),
                "color": color,
                "r": r,
                "props": props
            }
            if font_size is not None:
                new_node["fontSize"] = font_size
                
            new_nodes.append(new_node)
            
        elif obj_type == "edge":
            # Assemble the new standard compliant edge object
            new_edge = {
                "id": obj.get("id"),
                "source": obj.get("sourceId"),  # Links to node id instead of description
                "target": obj.get("targetId"),  # Links to node id instead of description
                "label": obj.get("label", ""),
                "directed": True,
                "style": "straight",
                "dash": "solid",
                "arrowSize": "medium"
            }
            new_edges.append(new_edge)
            
    # Package everything into the new two-tier standard envelope
    migrated_lpg = {
        "nodes": new_nodes,
        "edges": new_edges
    }
    
    # Save output with clean formatting
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(migrated_lpg, f, indent=2, ensure_ascii=False)
        
    print(f"🎉 Success! Migrated {len(new_nodes)} nodes and {len(new_edges)} edges to the new LPG standard.")

if __name__ == "__main__":
    # Ensure paths align with your environment setup
    source = "Space_Engineers_SPA-GraphML_Progression_Aug-25.json"
    destination = "Space_Engineers_NEW_LPG_Format.json"
    
    if os.path.exists(source):
        migrate_to_new_lpg(source, destination)
    else:
        print(f"Error: Missing file layout data source '{source}' in the current execution folder.")
