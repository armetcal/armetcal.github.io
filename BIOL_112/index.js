// Assign default button values
//------Global----------
var extra_bases_1;
var extra_bases_2;
var template_strand = '';
var num_start = '';
var mrna_sequence = '';
var pep_out = '';
var output_top;
var output_bottom;
var button1_value = 0;
var button2_value = 0;
var button3_value = 0;
var button4_value = 0;
var last_hint = 0;
const total_length = 35;
var clicked = 0;

function do_onclick() {

    // Reset questions
    document.getElementById("answer1").innerHTML = "";
    document.getElementById("answer2").innerHTML = "";
    document.getElementById("answer3").innerHTML = "";
    document.getElementById("answer4").innerHTML = "";

    // Number of codons
    var n_codons = [0,1,2,2,2,3,3,3,4,4,4];
    var random1 = Math.floor(Math.random() * n_codons.length);
    var num_codons = n_codons[random1];
    var description1 = 'A bacterial gene was sequenced and a small stretch of this double-stranded DNA is shown below. Only the <b>start codon (AUG), '
    var description2 = ' amino acid(s), and the stop codon (UAA, UAG, or UGA)</b> of the protein are represented by this DNA sequence (i.e. the DNA downstream of the promoter, after the +1 site and before the terminator).<br/><br/>'
    document.getElementById("num_codons").innerHTML = description1 + num_codons.toString() + description2;

    // Variables
    button1_value = 0;
    button2_value = 0;
    button3_value = 0;
    button4_value = 0;
    clicked = 0;
    last_hint = 0;

    // Codon Table
    const ct = {'Ala': ['GCA','GCC','GCG','GCT'], 
                    'Arg': ['AGA','AGG','CGA','CGC','CGG','CGT'], 
                    'Asn': ['AAC','AAT'],
                    'Asp': ['GAC','GAT'],
                    'Cys': ['TGC','TGT'],
                    'Gln': ['CAA','CAG'],
                    'Glu': ['GAA','GAG'],
                    'Gly': ['GGA','GGC','GGG','GGT'],
                    'His': ['CAC','CAT'],
                    'Ile': ['ATA','ATC','ATT'],
                    'Leu': ['CTA','CTC','CTG','CTT','TTA','TTG'],
                    'Lys': ['AAA','AAG'],
                    'Met': ['ATG'],
                    'Phe': ['TTC','TTT'],
                    'Pro': ['CCA','CCC','CCG','CCT'],
                    'Ser': ['AGC','AGT','TCA','TCC','TCG','TCT'],
                    'Stp': ['TAA','TAG','TGA'],
                    'Thr': ['ACA','ACC','ACG','ACT'],
                    'Trp': ['TGG'],
                    'Tyr': ['TAC','TAT'],
                    'Val': ['GTA','GTC','GTG','GTT']
                    };
                    
    var ct_stop = $.extend( true, {}, ct);
    var ct_stop = ct_stop.Stp;
    var ct_nostop = $.extend( true, {}, ct);
    delete ct_nostop.Stp;
    // Assign top/bottom strand
    var temp = ['top','bottom'];
    var random2 = Math.round(Math.random());
    var direction = temp[random2];
    // Determine protein code
    var protein = [];
    var bases = ['A','T','G','C'];
    while(protein.length<num_codons){
        let b1 = bases[Math.floor(Math.random() * 4)];
        let b2 = bases[Math.floor(Math.random() * 4)];
        let b3 = bases[Math.floor(Math.random() * 4)];
        let cdn = b1+b2+b3;
        if(!(ct_stop.includes(cdn))){
            protein.push(cdn);  
        } 
    }  
    
    // Assemble coding strand
    var final_string = 'ATG' + protein.join('') + ct_stop[Math.floor(Math.random() * 3)];
    var num_bases_needed = 35-final_string.length;
    extra_bases_1 = Math.floor(Math.random() * (1+num_bases_needed));
    extra_bases_2 = num_bases_needed - extra_bases_1;
    var pre = [];
    while(pre.length<extra_bases_1){
        pre.push(bases[Math.floor(Math.random() * 4)]);
    }
    var post = [];
    while(post.length<extra_bases_2){
        post.push(bases[Math.floor(Math.random() * 4)]);
    }
    var complete_string = pre.join('') + final_string + post.join('');
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Add wrong start codons
    // All unchangeable bases: start/stop codon, any bases that would run into start/stop
    var e = extra_bases_1;
    var e2 = total_length-extra_bases_2;
    var untouchable = [e-2,e-1,e,e+1,e+2,e2-5,e2-4,e2-3,e2-2,e2-1];
    // Determine # of fake start codons
    var fake_atg = Math.round(Math.random());
    var fake_cat = Math.round(Math.random()+1);
    // Add fake atg
    var changeable = Array.from({length: (total_length-3)}, (_, index) => index + 1);
    var changeable = changeable.filter(b => !(untouchable.includes(b)));
    if(fake_atg == 1){
        var temp = changeable[Math.floor(Math.random() * changeable.length)];
        var remove_from_changeable_for_gta = [temp,temp+1,temp+2];
        var changeable = changeable.filter(b => !(remove_from_changeable_for_gta.includes(b)));
        var complete_string = complete_string.split('')
        complete_string[temp] = 'A';
        complete_string[temp+1] = 'T';
        complete_string[temp+2] = 'G';
        var complete_string = complete_string.join('');
    }
    // Add fake cat
    while(fake_cat>0){
        var temp = changeable[Math.floor(Math.random() * changeable.length)];
        var remove_from_changeable_for_gta = [temp,temp+1,temp+2];
        var changeable = changeable.filter(b => !(remove_from_changeable_for_gta.includes(b)));
        var complete_string = complete_string.split('')
        complete_string[temp] = 'C';
        complete_string[temp+1] = 'A';
        complete_string[temp+2] = 'T';
        var complete_string = complete_string.join('');
        var fake_cat = fake_cat-1;
    }
    // Check for multiple correct answers
    var num_atg = [];
    var indexOccurence = complete_string.indexOf('ATG', 0);
    while(indexOccurence >= 0) {
        num_atg.push(indexOccurence);
        indexOccurence = complete_string.indexOf('ATG', indexOccurence + 1);
    }
    var num_atg = num_atg.filter(b => b != extra_bases_1);
    for(var i = 0; i<num_atg.length; i++){
        var temp = num_atg[i]+3+(3*num_codons);
        var temp2 = complete_string.substring(temp,temp+3);
        if(ct_stop.includes(temp2)){
            if(changeable.includes(temp)){
                var complete_string = complete_string.split('')
                complete_string[temp] = 'C'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp);
            } else if(changeable.includes(temp+1)){
                var complete_string = complete_string.split('')
                complete_string[temp+1] = 'C'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp+1);
            } else if(changeable.includes(temp+2)){
                var complete_string = complete_string.split('')
                complete_string[temp+2] = 'C'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp+2);
            } else {
                document.getElementById("num_codons").innerHTML = "<h3>Error - please generate a new problem.</h3>";
                document.getElementById("output_top").innerHTML = '';
                document.getElementById("output_bottom").innerHTML = '';
            }

        }
    }
    var num_cat = [];
    var indexOccurence = complete_string.indexOf('CAT', 0);
    while(indexOccurence >= 0) {
        num_cat.push(indexOccurence);
        indexOccurence = complete_string.indexOf('CAT', indexOccurence + 1);
    }
    for(var i = 0; i<num_cat.length; i++){
        var temp = num_cat[i]-3-(3*num_codons);
        var temp2 = complete_string.substring(temp,temp+3);
        var temp3 = ['TTA','CTA','TCA'];
        if(temp3.includes(temp2)){
            if(changeable.includes(temp)){
                var complete_string = complete_string.split('')
                complete_string[temp] = 'G'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp);
            } else if(changeable.includes(temp+1)){
                var complete_string = complete_string.split('')
                complete_string[temp+1] = 'G'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp+1);
            } else if(changeable.includes(temp+2)){
                var complete_string = complete_string.split('')
                complete_string[temp+2] = 'G'
                var complete_string = complete_string.join('');
                var changeable = changeable.filter(b => b != temp+2);
            } else {
                document.getElementById("num_codons").innerHTML = "<h3>Error - please generate a new problem.</h3>";
                document.getElementById("output_top").innerHTML = '';
                document.getElementById("output_bottom").innerHTML = '';
            }

        }
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    // Reverse if necessary
    if(direction=='bottom'){
        template_strand = 'Top';
        var complete_string = complete_string.split('');
        var complete_string = complete_string.reverse();
        var complete_string = complete_string.join('');
    } else {
        template_strand = 'Bottom'
    }
    // Create template strand
    const base_key = { // coding: [template, mRNA]
        'A':['T','A'],
        'T':['A','U'],
        'G':['C','G'],
        'C':['G','C']
    }
    var coding = complete_string;
    var template = ''
    var mRNA = ''
    for(var i = 0; i<coding.length; i++){
        var temp = coding[i];
        var template = template + base_key[temp][0];
        var mRNA = mRNA + base_key[temp][1];
    }
    // Combine - will have to print one on top of each other
    if(direction=='top'){
        output_top = '5-' + coding + '-3';
        output_bottom = '3-' + template + '-5';
    } else {
        output_top = '5-' + template + '-3';
        output_bottom = '3-' + coding + '-5';
    }
    document.getElementById("output_top").innerHTML = output_top;
    document.getElementById("output_bottom").innerHTML = output_bottom;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
    // Correct answers:
    // Direction defined above
    // # Start codons
    var temp = num_atg.length + num_cat.length + 1
    num_start = temp.toString()
    // mRNA sequence
    if(direction=='bottom'){
        var temp = mRNA.split('');
        var temp = temp.reverse();
        var temp = temp.join('');
        mrna_sequence = '5-' + temp + '-3';
    } else {
        mrna_sequence = '5-' + mRNA + '-3';
    }
    // Peptide sequence
    var pep = ['Met']
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].includes(value));
    }
    
    if(template_strand == 'Top'){
        var temp = '' + output_bottom;
        var temp_translate = temp.slice(extra_bases_2+5, 39-extra_bases_1-2);
        var temp_translate = temp_translate.split('');
        var temp_translate = temp_translate.reverse();
        var temp_translate = temp_translate.join('');
    } else if(template_strand == 'Bottom'){
        var temp = '' + output_top;
        var temp_translate = temp.slice(extra_bases_1+2, 39-extra_bases_2-5);
    }

    for(var i = 3; i<temp_translate.length; i=i+3){
        var temp = temp_translate.slice(i,i+3);
        var temp2 = getKeyByValue(ct,temp);
        pep.push(temp2);
    }
    if(pep.includes('Stp')){
        do_onclick()
    } else {
        pep_out = 'N-' + pep.join('-') + '-C';
    }
    
}

function button_show_onclick(){
    if(clicked == 0 || button1_value == 0 && button2_value == 0 && button3_value == 0 && button4_value == 0) {
      document.getElementById("answer1").innerHTML = num_start;
      document.getElementById("answer2").innerHTML = template_strand;
      document.getElementById("answer3").innerHTML = mrna_sequence;
      document.getElementById("answer4").innerHTML = pep_out;
      clicked = 1;
      button1_value = 1;
      button2_value = 1;
      button3_value = 1;
      button4_value = 1;
    } else {
      document.getElementById("answer1").innerHTML = "";
      document.getElementById("answer2").innerHTML = "";
      document.getElementById("answer3").innerHTML = "";
      document.getElementById("answer4").innerHTML = "";
      clicked = 0;
      button1_value = 0;
      button2_value = 0;
      button3_value = 0;
      button4_value = 0;
    }
}
function button1_onclick(){
    if(button1_value == 0 ) {
      document.getElementById("answer1").innerHTML = num_start;
      button1_value = 1;
    } else {
      document.getElementById("answer1").innerHTML = "";
      button1_value = 0;
    }
}
function button2_onclick(){
    if(button2_value == 0 ) {
      document.getElementById("answer2").innerHTML = template_strand;
      button2_value = 1;
    } else {
      document.getElementById("answer2").innerHTML = "";
      button2_value = 0;
    }
}
function button3_onclick(){
    if(button3_value == 0 ) {
      document.getElementById("answer3").innerHTML = mrna_sequence;
      button3_value = 1;
    } else {
      document.getElementById("answer3").innerHTML = "";
      button3_value = 0;
    }
}
function button4_onclick(){
    if(button4_value == 0 ) {
      document.getElementById("answer4").innerHTML = pep_out;
      button4_value = 1;
    } else {
      document.getElementById("answer4").innerHTML = "";
      button4_value = 0;
    }
}

// HINTS

// 1. First button will cause the start codons to be highlighted
function button_hint1_onclick(){
    if(last_hint == 0 || last_hint == 2){
        // top strand
        var top_copy = '' + output_top;
        var temp = [];
        var indexOccurence = top_copy.indexOf('ATG', 0);
        while(indexOccurence >= 0) {
            temp.push(indexOccurence);
            indexOccurence = top_copy.indexOf('ATG', indexOccurence + 1);
        }
        for(var i=temp.length-1; i>=0; i--){
            var a = top_copy.slice(0,temp[i]);
            var b = top_copy.slice(temp[i]+3);
            var top_copy = a + '<mark>ATG</mark>' + b;
        }
        // bottom strand
        var bottom_copy = '' + output_bottom;
        var temp = [];
        var indexOccurence = bottom_copy.indexOf('GTA', 0);
        while(indexOccurence >= 0) {
            temp.push(indexOccurence);
            indexOccurence = bottom_copy.indexOf('GTA', indexOccurence + 1);
        }
        for(var i=temp.length-1; i>=0; i--){
            var a = bottom_copy.slice(0,temp[i]);
            var b = bottom_copy.slice(temp[i]+3);
            var bottom_copy = a + '<mark>GTA</mark>' + b;
        }
        document.getElementById("output_top").innerHTML = top_copy;
        document.getElementById("output_bottom").innerHTML = bottom_copy;
        last_hint = 1;
    } else {
        document.getElementById("output_top").innerHTML = output_top;
        document.getElementById("output_bottom").innerHTML = output_bottom;
        last_hint = 0;
    }
    
}

// 2. Second button will highlight the translated region.

function button_hint2_onclick(){
    if(last_hint == 0 || last_hint == 1){
        if(template_strand == 'Top'){
            var temp = '' + output_bottom;
            var temp_pre = temp.slice(0,extra_bases_2+5);
            var temp_highlight = temp.slice(extra_bases_2+5, 39-extra_bases_1-2);
            var temp_end = temp.slice(39-extra_bases_1-2);
            var temp_out = temp_pre + '<mark>' + temp_highlight + '</mark>' + temp_end;
            document.getElementById("output_top").innerHTML = output_top;
            document.getElementById("output_bottom").innerHTML = temp_out;
        } else if(template_strand == 'Bottom'){
            var temp = '' + output_top;
            var temp_pre = temp.slice(0,extra_bases_1+2);
            var temp_highlight = temp.slice(extra_bases_1+2, 39-extra_bases_2-5);
            var temp_end = temp.slice(39-extra_bases_2-5);
            var temp_out = temp_pre + '<mark>' + temp_highlight + '</mark>' + temp_end;
            document.getElementById("output_top").innerHTML = temp_out;
            document.getElementById("output_bottom").innerHTML = output_bottom;
        }
        last_hint = 2;
    } else {
        document.getElementById("output_top").innerHTML = output_top;
        document.getElementById("output_bottom").innerHTML = output_bottom;
        last_hint = 0;
    }
    
}