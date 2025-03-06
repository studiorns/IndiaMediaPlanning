#!/usr/bin/env python3
"""
Convert India Travel Queries Forecast CSV files to Excel format.
"""

import pandas as pd
import os

def csv_to_excel(csv_file, excel_file):
    """Convert a CSV file to Excel format."""
    print(f"Converting {csv_file} to {excel_file}...")
    
    try:
        # Try reading with default settings
        df = pd.read_csv(csv_file)
    except Exception as e:
        print(f"Error with default parser: {e}")
        try:
            # Try with more flexible parsing options
            # Using on_bad_lines='skip' (newer pandas versions) instead of error_bad_lines=False
            df = pd.read_csv(csv_file, engine='python', on_bad_lines='skip')
        except Exception as e1:
            print(f"Error with python engine: {e1}")
            # If that fails, try with even more flexible options
            try:
                df = pd.read_csv(csv_file, engine='python', sep=None, quotechar='"', on_bad_lines='skip')
            except Exception as e2:
                print(f"Failed to parse CSV file: {e2}")
                return False
    
    # Write to Excel
    df.to_excel(excel_file, index=False)
    
    print(f"Successfully converted {csv_file} to {excel_file}")
    return True

def main():
    """Main function to convert all India forecast CSV files to Excel."""
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define the CSV files to convert
    csv_files = [
        "Travel_Queries_Forecast_India_Conservative.csv",
        "Travel_Queries_Forecast_India_Moderate.csv",
        "Travel_Queries_Forecast_India_Ambitious.csv",
        "Travel_Queries_Forecast_India_Enhanced.csv",
        "India_Travel_Queries_2025_Forecast.csv"
    ]
    
    # Convert each CSV file to Excel
    for csv_file in csv_files:
        csv_path = os.path.join(script_dir, csv_file)
        excel_file = csv_path.replace('.csv', '.xlsx')
        
        if os.path.exists(csv_path):
            csv_to_excel(csv_path, excel_file)
        else:
            print(f"Warning: {csv_path} does not exist.")

if __name__ == "__main__":
    main()
