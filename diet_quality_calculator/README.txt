Diet Calculator Plan:

Main page:

- Find good quality free Food Frequency Questionnaire
    - It'd be super cool if we could somehow include pictures of example serving sizes, but it's probably too much work
      given the number of food items.
- Score following diets:
   - MIND Diet
   - Mediterranean Diet
   - Inflammatory Diet Index
        - EDIP -> bad choice
        - DIS, LIS: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6887697/
   - Glycemic Load/Average Glycemic Index
- Show diet scores as minimalistic clickable circles
    - Upon click:
        - Expands below to give a more detailed explanation of each score
        - Shows how you score compared to everyone else who's filled it out
            - Do we need seed values so that it's not skewed for the first ~100 people?
              Would it be easier to just show static ranges? The problem is, there wouldn't be empirical ranges
              for our specific FFQ+scoring scheme, so it'd be an inaccurate guess.
            - Just a note: I'd like to minimize cookies etc
            - That said, basic demographic breakdowns (Age, sex, location) would be cool
        - Brief description of the diet
        - Foodgroup breakdown: histograms/ 1D bar plots of each food group, coloured according to optimal consumption
          for the given diet score, with an indication of where your consumption rate fits in
        - Choose the three largest differences between intake + optimal intake, and print out corresponding dietary suggestions?
            - Need to be careful to not give medical advice (at least, not without a notice).
            - Maybe phrased as general statements about the food group? ex. "Eating more whole grains promotes the growth of
              healthy gut bacteria and increases regularity"
            - Perhaps best to avoid recommending alcohol? Also other food groups that may be unfairly weighted by the scoring method?
              ex. EDIP: tomatoes are pro-inf, pizza is anti-inf
- Download button lets users save a pdf of their results, with a 1 page summary for each diet

- Bottom of page: LEGAL DISCLAIMERS, contact info, etc
    - I want to ensure that we make it VERY clear throughout the website that these diet scores are NOT necessarily the 
      'correct' way to eat, and may not be best for everyone.

Other pages:

-  More information/resources about the diets