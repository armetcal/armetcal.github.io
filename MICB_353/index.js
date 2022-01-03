function do_onclick() {

    // Set up question parameters
    var dilution = ['1/2','1/4','1/5','1/10'];
    var random1 = Math.floor(Math.random() * dilution.length);
    var dil = dilution[random1];
    var n_dilutions = [1,2,2,3,3,4,5];
    var random2 = Math.floor(Math.random() * n_dilutions.length);
    var num_dilutions = n_dilutions[random2];
    var amt_plated = [0.01,0.02,0.05,0.5,1.0];
    var random3 = Math.floor(Math.random() * amt_plated.length);
    var amt = amt_plated[random3];
    var description1 = 'You are preparing a <strong><mark>';
    var description2 = ' serial dilution</strong></mark> of <em>Akkermansia muciniphila</em> in order to determine how many live bacteria are present in the sample. You prepare <strong><mark>';
    var description3 = ' dilution(s)</strong></mark> and seed <strong><mark>';
    document.getElementById("dilution_description").innerHTML = description1 + dil + description2 + num_dilutions.toString() + description3 + amt.toString() + ' ml</strong></mark> onto an agar plate.';

    // Calculate final dilution
    var split = dil.split('/');
    var new_denom = parseInt(split[1])**num_dilutions;
    var dil_num = '1/' + new_denom.toString();
    document.getElementById("answer1").innerHTML = dil_num.toString();

    // Calculate final plated dilution
    var plated = new_denom/amt;
    var plated_num = '1/' + plated.toString();
    document.getElementById("answer2").innerHTML = plated_num.toString();

    // Calculate CFU/ml
    var random4 = Math.floor(Math.random() * 400);
    var sample_type = ['ORIGINAL','FINAL DILUTED'];
    var random5 = Math.round(Math.random());
    var sample_type = sample_type[random5];
    var description4 = '3. After 3 days of anaerobic incubation, your plate has <strong><mark>';
    var description5 = '</strong></mark> colony forming units (CFUs). What was the CFU/ml of the '
    var description6 = ' sample?';
    document.getElementById("cfu_description").innerHTML = description4 + random4 + description5 + sample_type + description6;
    if(sample_type == 'ORIGINAL'){
        var cfu = random4*plated;
    } else {
        var cfu = random4/amt;
    }
    
    document.getElementById("answer3").innerHTML = cfu.toString();
}