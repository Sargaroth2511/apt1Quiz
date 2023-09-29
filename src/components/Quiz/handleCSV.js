import Papa from "papaparse";

const parseCSV = (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse("url", {
      download: true, // Indicate that we're downloading a file
      header: true, // Treat the first row as headers
      dynamicTyping: true, // Automatically parse numbers and booleans
      skipEmptyLines: true, // Skip empty lines in CSV
      delimiter: '"',
      complete: result => {
        // 'data' property of 'result' contains parsed CSV data
        result.errors.length > 7 ? reject(result.errors) : resolve(result.data);
      },
    });
  });
};

const addLearningField = convertedCSV => {
  for (let i = 0; i < convertedCSV.length; i++) {
    const element = convertedCSV[i];
    if (i <= 68) {
      element.LF = "LF 1";
    } else if (i <= 233) {
      element.LF = "LF 2";
    } else if (i <= 640) {
      element.LF = "LF 3";
    } else if (i <= 870) {
      element.LF = "LF 4";
    } else if (i <= 920) {
      element.LF = "LF 5";
    } else if (i <= 1214) {
      element.LF = "LF 6";
    } else if (i <= 1449) {
      element.LF = "LF 7";
    }
  }
  console.log(convertedCSV);
  return convertedCSV;
  // return addedLearnfield
};

const handleCSV = (url) => {
  const fetchData = async () => {
    try {
      const converted = await parseCSV(url);

      console.log(converted);
      const addedLearningField = addLearningField(converted);
      return addedLearningField;
    } catch (error) {
      console.error("Error parsing CSV: ", error);
      return [];
    }
  };

  return fetchData().then(data => data);
};

export default handleCSV;
