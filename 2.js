function sortArray(array) {
    var done = false;
    while (!done) {
        done = true
        for (var i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                done = false;
                var tmp = array[i - 1]
                array[i - 1] = array[i]
                array[i] = tmp
            }
        }
    }
    return array;
}

var dataArray = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21]
sortArray(dataArray)
console.log(dataArray)