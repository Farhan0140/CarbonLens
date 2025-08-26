VEHICLES = [
    ("bus", "Bus"),
    ("train", "Train"),
    ("cng", "CNG Auto"),
    ("rickshaw", "Rickshaw"),
    ("motorcycle", "Motorcycle"),
    ("pickup", "Pickup Truck"),
    ("car", "Car"),
    ("truck", "Truck"),
    ("microbus", "Microbus"),
    ("bicycle", "Bicycle"),
    ("electric_scooter", "Electric Scooter"),
    ("jeep", "Jeep"),
    ("tempo", "Tempo"),
    ("launch", "Launch"),
    ("airplane", "Airplane"),
]

FUEL_TYPES = {
    "bus": "diesel",
    "train": "diesel",
    "cng": "cng",
    "rickshaw": "human",
    "motorcycle": "petrol",
    "pickup": "diesel",
    "car": "petrol",
    "truck": "diesel",
    "microbus": "diesel",
    "bicycle": "human",
    "electric_scooter": "electric",
    "jeep": "diesel",
    "tempo": "cng",
    "launch": "diesel",
    "airplane": "jet_fuel",
}

MILEAGES = {
    "bus": 3.5,
    "train": 5.0,
    "cng": 28.0,
    "rickshaw": 9999,   # human powered, effectively "infinite"
    "motorcycle": 50.0,
    "pickup": 10.0,
    "car": 12.0,
    "truck": 8.0,
    "microbus": 10.0,
    "bicycle": 9999,    # human powered
    "electric_scooter": 35.0,
    "jeep": 9.0,
    "tempo": 18.0,
    "launch": 2.5,
    "airplane": 0.2,    # per passenger-km
}

EMISSION_FACTORS = {
    "petrol": 2.31,
    "diesel": 2.68,
    "cng": 2.75,
    "electric": 0.5,
    "human": 0,
    "jet_fuel": 3.15,
}