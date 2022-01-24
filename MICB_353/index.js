var random4;
var amt;
var split = 0;

var answer_1;
var answer_2;
var answer_3a;
var answer_3b;
var answer_4b;
var answer_4c;

var clicked = 0;
var button1_value = 0;
var button2_value = 0;
var button3a_value = 0;
var button3b_value = 0;
var button4b_value = 0;
var button4c_value = 0;
document.getElementById('button4b').style.display = "none";

// Main problems
function do_onclick() {

    document.getElementById('q4a').value = "none";
    document.getElementById('visualizer').classList = "hide";

    // Set up question parameters
    var dilution = ['1/2', '1/4', '1/5', '1/10'];
    var random1 = Math.floor(Math.random() * dilution.length);
    var dil = dilution[random1];
    var n_dilutions = [1, 2, 2, 3, 3, 4, 5];
    var random2 = Math.floor(Math.random() * n_dilutions.length);
    var num_dilutions = n_dilutions[random2];
    var amt_plated = [0.01, 0.02, 0.05, 0.5, 1.0];
    var random3 = Math.floor(Math.random() * amt_plated.length);
    amt = amt_plated[random3];
    var description1 = 'You are preparing a <b>';
    var description2 = ' serial dilution</b> of <em>Akkermansia muciniphila</em> in order to determine how many live bacteria are present in the sample. You prepare <b>';
    var description3 = ' dilution(s)</b> and seed <b>';
    document.getElementById("dilution_description").innerHTML = description1 + dil + description2 + num_dilutions.toString() + description3 + amt.toString() + ' ml</b> onto an agar plate.';

    // Calculate final dilution
    split = dil.split('/');
    split = parseInt(split[1]);
    var new_denom = split ** num_dilutions;
    answer_1 = '1/' + new_denom.toString();
    answer_1 = answer_1.toString();

    // Calculate final plated dilution
    var plated = new_denom / amt;
    answer_2 = '1/' + plated.toString();
    answer_2 = answer_2.toString();

    // Calculate CFU/ml
    random4 = Math.floor(Math.random() * 400);
    var description4 = '3. After 3 days of anaerobic incubation, your plate has <b>';
    var description5 = '</b> colony forming units (CFUs).';
    document.getElementById("cfu_description").innerHTML = description4 + random4 + description5;
    answer_3a = random4 * plated;
    answer_3b = random4 / amt;
    answer_3a = answer_3a.toString();
    answer_3b = answer_3b.toString();

    // Settings
    document.getElementById('q4a').value = "none";
    document.getElementById("quest_4b").innerHTML = "";
    document.getElementById("quest_4c").innerHTML = "";
    document.getElementById("answer4b").innerHTML = "";
    document.getElementById("answer4c").innerHTML = "";
    document.getElementById('button4b').style.display = "none";
    document.getElementById('button4c').style.display = "none";
    clicked = 0;
    button1_value = 0;
    button2_value = 0;
    button3a_value = 0;
    button3b_value = 0;
    button4b_value = 0;
    button4c_value = 0;
    document.getElementById("answer1").innerHTML = "";
    document.getElementById("answer2").innerHTML = "";
    document.getElementById("answer3a").innerHTML = "";
    document.getElementById("answer3b").innerHTML = "";
    document.getElementById("answer4b").innerHTML = "";
    document.getElementById("answer4c").innerHTML = "";
}

// Question 4b
function display_4b() {
    var x = document.getElementById('q4a').value;
    document.getElementById('question_4').classList = "show";
    if (x == 'none' || x == 'acc') {
        answer_4c = NaN;
        document.getElementById('button4b').style.display = "none";
        document.getElementById('button4c').style.display = "none";
        document.getElementById("quest_4b").innerHTML = "";
        document.getElementById("quest_4c").innerHTML = "";
        document.getElementById("answer4b").innerHTML = "";
        document.getElementById("answer4c").innerHTML = "";
    } else {
        document.getElementById('button4b').style.display = "inline";
        document.getElementById('button4c').style.display = "inline";
        document.getElementById("quest_4b").innerHTML = "4b. What is the expected CFU/ml of this serial dilution? <em>Round to the nearest integer.</em><br>";
        document.getElementById("quest_4c").innerHTML = "4c. What is the expected CFU of this serial dilution after plating? <em>Round to the nearest integer and assume that the same volume is seeded.</em><br>";
        if (x == 'more') {
            answer_4b = (random4 / amt) / split;
            answer_4c = random4 / split;
        } else if (x == 'less') {
            answer_4b = (random4 / amt) * split;
            answer_4c = random4 * split;
        }
        answer_4b = Math.round(answer_4b);
        answer_4c = Math.round(answer_4c);
        answer_4b = answer_4b.toString();
        answer_4c = answer_4c.toString();
    }
    number_line();
    document.getElementById('visualizer').classList = "show";
}

// Create number line for CFU counts
function number_line() {
    // http://microbiologynetwork.com/counting-colonies.asp
    // Breed and Dotterrer chose their countable plates from triplicate platings of each dilution,
    // requiring acceptable plates to be within 20% of the average. 
    // On this analysis, plates with more than 400 CFU were unsatisfactory, as were those of less than 30 CFU,
    // with best results in the range of 50-200 CFU/plate.
    var orig = {
        y: [''],
        x: [random4],
        name: 'Original CFU',
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: 10,
            color: 'rgb(0,0,0)'
        }
    };

    var updated = {
        y: [''],
        x: [answer_4c],
        name: 'New CFU',
        type: 'scatter',
        mode: 'markers',
        marker: {
            size: 10,
            color: 'rgb(255,255,255)',
            line: {
                color: 'rgb(0,0,0)',
                width: 1
            }
        },
    };

    var too_low = {
        y: [''],
        x: [30],
        name: 'Too Low',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,0,0)',
            width: [0.1]
        }
    };

    var low = {
        y: [''],
        x: [20], //Added to 30, so 30-50 range
        name: 'Acceptably Low',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,217,0)',
            width: [0.1]
        }
    };

    var ideal = {
        y: [''],
        x: [150], //Added to 50, so 50-200 range
        name: 'Ideal',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(0,255,0)',
            width: [0.1]
        }
    };

    var high = {
        y: [''],
        x: [100], //Added to 200, so 200-300 range
        name: 'Acceptably High',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,217,0)',
            width: [0.1]
        }
    };

    var too_high = {
        y: [''],
        x: [100], //Added to 300, so 300-400 range
        name: 'Too High',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,0,0)',
            width: [0.1]
        },
        hoverinfo: 'name'
    };

    var data = [orig, updated, too_low, low, ideal, high, too_high];

    var layout = {
        autosize: false,
        width: 700,
        height: 100,
        margin: {
            l: 10,
            r: 10,
            b: 50,
            t: 10,
            pad: 0
        },
        barmode: 'stack',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        orientation: "h",
        showlegend: false,
        font: {
            size: 18,
            color: 'rgb(255,255,255)'
        }
    };

    Plotly.newPlot('visualizer', data, layout, { scrollZoom: true});
}

// Question/Answer Buttons
function button_show_onclick() {
    if (clicked == 0 || button1_value == 0 && button2_value == 0 && button3a_value == 0 && button3b_value == 0 && button4b_value == 0 && button4c_value == 0) {
        document.getElementById("answer1").innerHTML = answer_1;
        document.getElementById("answer2").innerHTML = answer_2;
        document.getElementById("answer3a").innerHTML = answer_3a;
        document.getElementById("answer3b").innerHTML = answer_3b;
        clicked = 1;
        button1_value = 1;
        button2_value = 1;
        button3a_value = 1;
        button3b_value = 1;
        // Change Q4 if applicable
        var x = document.getElementById('q4a').value;
        if (x == 'more' || x == 'less') {
            document.getElementById("answer4b").innerHTML = answer_4b;
            document.getElementById("answer4c").innerHTML = answer_4c;
            button4b_value = 1;
            button4c_value = 1;
        }
    } else {
        document.getElementById("answer1").innerHTML = "";
        document.getElementById("answer2").innerHTML = "";
        document.getElementById("answer3a").innerHTML = "";
        document.getElementById("answer3b").innerHTML = "";
        document.getElementById("answer4b").innerHTML = "";
        document.getElementById("answer4c").innerHTML = "";
        clicked = 0;
        button1_value = 0;
        button2_value = 0;
        button3a_value = 0;
        button3b_value = 0;
        button4b_value = 0;
        button4c_value = 0;
    }
}
function button1_onclick() {
    if (button1_value == 0) {
        document.getElementById("answer1").innerHTML = answer_1;
        button1_value = 1;
    } else {
        document.getElementById("answer1").innerHTML = "";
        button1_value = 0;
    }
}
function button2_onclick() {
    if (button2_value == 0) {
        document.getElementById("answer2").innerHTML = answer_2;
        button2_value = 1;
    } else {
        document.getElementById("answer2").innerHTML = "";
        button2_value = 0;
    }
}
function button3a_onclick() {
    if (button3a_value == 0) {
        document.getElementById("answer3a").innerHTML = answer_3a;
        button3a_value = 1;
    } else {
        document.getElementById("answer3a").innerHTML = "";
        button3a_value = 0;
    }
}
function button3b_onclick() {
    if (button3b_value == 0) {
        document.getElementById("answer3b").innerHTML = answer_3b;
        button3b_value = 1;
    } else {
        document.getElementById("answer3b").innerHTML = "";
        button3b_value = 0;
    }
}
function button4b_onclick() {
    if (button4b_value == 0) {
        document.getElementById("answer4b").innerHTML = answer_4b;
        button4b_value = 1;
    } else {
        document.getElementById("answer4b").innerHTML = "";
        button4b_value = 0;
    }
}
function button4c_onclick() {
    if (button4c_value == 0) {
        document.getElementById("answer4c").innerHTML = answer_4c;
        button4c_value = 1;
    } else {
        document.getElementById("answer4c").innerHTML = "";
        button4c_value = 0;
    }
}