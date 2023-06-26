#!/bin/bash

# Set default file input/output name
FILE_INPUT_NAME=.env.array
FILE_OUTPUT_NAME=.env

# Set file input/output name, when user add options
while getopts "i:o:" opt; do
  case $opt in
    i)
      FILE_INPUT_NAME=$OPTARG ;;
    o)
      FILE_OUTPUT_NAME=$OPTARG ;;
    *) echo "usage: $0 [-i] [-o]" >&2
       exit 1 ;;
  esac
done

# Read all environment variables that have to be copied from input file
declare env_array=()

while IFS= read -r line || [[ "$line" ]]; do
  line2="${line//[$'\n\r']/}"
  line2="${line2##*( )}"
  env_array+=("$line2")
done < "${FILE_INPUT_NAME}"

# Print all environment variables to output file
if [ "${#env_array[@]}" -eq 0 ]; then
  echo "There is no environment variables";
else
  # Clean the first line
  { printf ""; } > "${FILE_OUTPUT_NAME}";

  for i in "${env_array[@]}";
  do
    printf "%s\n" "${i}=${!i}" >> "${FILE_OUTPUT_NAME}";
  done
fi;
