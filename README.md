# Hyper-Local Disease Surveillance ("Flu Radar")

## Usage Guide
This pipeline processes pharmacy sales data to detect disease outbreaks.

### Prerequisites
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Pipeline

1. **Download/Generate Datasets**
   Checks for raw data and generates synthetic files if missing (crucial for quick start).
   ```bash
   python scripts/01_download_datasets.py
   ```

2. **Clean Data**
   Standardizes formats and tags symptomatic medicines.
   ```bash
   python scripts/02_data_cleaning.py
   ```

3. **Feature Engineering**
   Calculates baselines and detects anomalies.
   ```bash
   python scripts/03_feature_engineering.py
   ```

4. **Generate Synthetic Demo Data**
   Creates a realistic transaction log with injected outbreaks for visualization.
   ```bash
   python scripts/04_generate_synthetic.py
   ```

   **[Advanced] Generate Production-Grade Datasets**
   Generates Hospital Admissions and Internet Search Trends for multi-modal validation.
   ```bash
   python scripts/06_generate_advanced_synthetic.py
   ```

5. **Upload to Database**
   Push data to Supabase (Requires `.env` with SUPABASE_URL and KEY).
   ```bash
   python scripts/05_upload_to_db.py
   ```

### Troubleshooting
- **Missing Files**: Run script `01` first.
- **Supabase Error**: Check your `.env` file for valid credentials.
