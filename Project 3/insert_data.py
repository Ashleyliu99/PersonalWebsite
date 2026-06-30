import pandas as pd
import mysql.connector
import os

# ============================================================
# ⚠️  UPDATE THESE 3 LINES WITH YOUR MYSQL DETAILS
# ============================================================
DB_CONFIG = {
    "host": "localhost",
    "user": "root",              # ⚠️ YOUR MySQL username (usually "root")
    "password": "lyj19971214@LYJ", # ⚠️ YOUR MySQL password
    "database": "real_estate_analytics"  # ⚠️ YOUR database name in MySQL Workbench
}
# ============================================================

DATA_PATH = r"C:\Job searching\Portfolio\Project 3\Data"

# Order matters due to foreign keys
CSV_TABLES = [
    "users",
    "agents",
    "sellers",
    "buyers",
    "houses",
    "transactions"
]

# --- CONNECT TO DATABASE ---
try:
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    print("✅ Connected to database successfully!\n")
except Exception as e:
    print(f"❌ Failed to connect: {e}")
    print("👉 Check your username, password, and database name above.")
    exit()

# --- INSERT CSV FILES ---
for table in CSV_TABLES:
    file_path = os.path.join(DATA_PATH, f"{table}.csv")

    if not os.path.exists(file_path):
        print(f"⚠️  File not found: {file_path}, skipping...")
        continue

    try:
        df = pd.read_csv(file_path)
        df = df.where(pd.notnull(df), None)  # Convert NaN to NULL

        cols = ", ".join(df.columns)
        placeholders = ", ".join(["%s"] * len(df.columns))
        sql = f"INSERT INTO {table} ({cols}) VALUES ({placeholders})"

        data = [tuple(row) for row in df.values]
        cursor.executemany(sql, data)
        conn.commit()

        print(f"✅ Inserted {len(df)} rows into '{table}'")

    except Exception as e:
        print(f"❌ Error inserting '{table}': {e}")

# --- DONE ---
cursor.close()
conn.close()
print("\n🎉 All done!")

