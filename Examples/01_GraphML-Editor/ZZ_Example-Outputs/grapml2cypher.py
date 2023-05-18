import networkx as nx

def create_cypher_from_graphml(graphml_path, cypher_output_path):
    G = nx.read_graphml(graphml_path)

    with open(cypher_output_path, 'w') as cypher_file:
        cypher_file.write("BEGIN\n")

        for node, data in G.nodes(data=True):
            cypher_file.write(f"CREATE (n:Node {{id: '{node}'}});\n")
        
        cypher_file.write("WITH 1 as dummy\n")

        for source, target, data in G.edges(data=True):
            relation = data.get('relation', 'RELATED')
            cypher_file.write(f"MATCH (a:Node),(b:Node) WHERE a.id = '{source}' AND b.id = '{target}' CREATE (a)-[r:{relation}]->(b);\n")
        
        cypher_file.write("COMMIT\n")

# usage
create_cypher_from_graphml('SpaceEngineers_LearningToSurvive.graphml', 'output_cypher.cypher')
