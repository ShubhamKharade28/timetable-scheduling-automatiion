def save_to_json(data, filename="data/output.json"):
    import json

    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

