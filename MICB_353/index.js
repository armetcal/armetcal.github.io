var random4;
var new_cfu = NaN;
var amt;
var split = 0;

function do_onclick() {

    document.getElementById('q4a').value = "none";

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
    var description1 = 'You are preparing a <strong><mark>';
    var description2 = ' serial dilution</strong></mark> of <em>Akkermansia muciniphila</em> in order to determine how many live bacteria are present in the sample. You prepare <strong><mark>';
    var description3 = ' dilution(s)</strong></mark> and seed <strong><mark>';
    document.getElementById("dilution_description").innerHTML = description1 + dil + description2 + num_dilutions.toString() + description3 + amt.toString() + ' ml</strong></mark> onto an agar plate.';

    // Calculate final dilution
    split = dil.split('/');
    split = parseInt(split[1]);
    var new_denom = split ** num_dilutions;
    var dil_num = '1/' + new_denom.toString();
    document.getElementById("answer1").innerHTML = dil_num.toString();

    // Calculate final plated dilution
    var plated = new_denom / amt;
    var plated_num = '1/' + plated.toString();
    document.getElementById("answer2").innerHTML = plated_num.toString();

    // Calculate CFU/ml
    random4 = Math.floor(Math.random() * 400);
    var sample_type = ['ORIGINAL', 'FINAL DILUTED'];
    var random5 = Math.round(Math.random());
    var sample_type = sample_type[random5];
    var description4 = '3. After 3 days of anaerobic incubation, your plate has <strong><mark>';
    var description5 = '</strong></mark> colony forming units (CFUs).';
    document.getElementById("cfu_description").innerHTML = description4 + random4 + description5;
    cfu_final = random4 * plated;
    cfu_original = random4 / amt;
    document.getElementById("answer3a").innerHTML = cfu_final.toString();
    document.getElementById("answer3b").innerHTML = cfu_original.toString();
    document.getElementById('q4a').value = "none";
    document.getElementById("quest_4b").innerHTML = "";
    document.getElementById("quest_4c").innerHTML = "";
    document.getElementById("answer4").innerHTML = "";
    document.getElementById("answer5").innerHTML = "";
}

// Question 4b
function display_4b() {
    var x = document.getElementById('q4a').value;
    if (x == 'none' || x == 'acc') {
        new_cfu = NaN;
        document.getElementById("quest_4b").innerHTML = "";
        document.getElementById("quest_4c").innerHTML = "";
        document.getElementById("answer4").innerHTML = "";
        document.getElementById("answer5").innerHTML = "";
    } else {
        document.getElementById("quest_4b").innerHTML = "<h4>4b. What is the expected CFU/ml of this serial dilution? <em>Round to the nearest integer.</em></h4>";
        document.getElementById("quest_4c").innerHTML = "<h4>4c. What is the expected CFU of this serial dilution after plating? <em>Round to the nearest integer and assume that the same volume is seeded.</em></h4>";
        if (x == 'more') {
            var new_conc = (random4 / amt) / split;
            new_cfu = random4 / split;
        } else if (x == 'less') {
            var new_conc = (random4 / amt) * split;
            new_cfu = random4 * split;
        }
        var new_conc = Math.round(new_conc);
        new_cfu = Math.round(new_cfu);
        document.getElementById("answer4").innerHTML = new_conc.toString();
        document.getElementById("answer5").innerHTML = new_cfu.toString();
    }
    number_line();
}

function number_line() {

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
        x: [new_cfu],
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
        name: 'Low',
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
        x: [200], //Added to 200, so 200-400 range
        name: 'High',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,217,0)',
            width: [0.1]
        }
    };

    var too_high = {
        y: [''],
        x: [200], //Added to 400, so 400-600 range
        name: 'Too High',
        type: 'bar',
        orientation: "h",
        marker: {
            color: 'rgb(255,0,0)',
            width: [0.1]
        }
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

    Plotly.newPlot('visualizer', data, layout, { scrollZoom: true });
}