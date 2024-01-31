import quizlet from '../../JSON/quizlet.json'

const addLearnfield = () => {
        for (let i = 0; i < quizlet.length; i++) {
          const element = quizlet[i];
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

    return quizlet
}

export default addLearnfield