# App still needs multiple pages, the ability to deal with \n (currently breaks the unusual word counter).
# The main percentage generator
#

library(shiny)
library(officer)
library(Rfast)
library(tidyverse)

# Define UI for application that draws a histogram
ui <- fluidPage(
    
    # Application title
    titlePanel("1000 Words"),
    
    # Sidebar with a slider input for number of bins 
    sidebarLayout(
        
        sidebarPanel(
        
            # If input is word doc
            fileInput("file", "Upload Word Document (Optional, .docx only)",
                      multiple = FALSE,
                      accept = c(".docx")),
        ),
        
        # Show a plot of the generated distribution
        mainPanel(
            tabsetPanel(type = 'pills',
                        id = 'all_tabs',
                        tabPanel('Text Entry',
                                 textAreaInput("caption", "Paste Text Here", "", width = "750px"),
                                 
                                 htmlOutput(outputId = "text")
                                 ),
                        tabPanel('Common Word Table',
                                 fluidRow(
                                     column(9, dataTableOutput('stats_table'))
                                     )),
                        tabPanel('Uncommon Word Table',
                                 fluidRow(
                                     column(9, dataTableOutput('unusual_word_table'))
                                     ))
                        )
        )
    )
)

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

server <- function(input, output) {
    
    upload <- reactive({
        req(input$file)
        up = read_docx(input$file[['datapath']])
        return(up)
    })
    
    df <- reactive({
        
        filepath = 'C:/Users/User/Documents/Extracurricular Projects/1000words'
        ref = read.csv(paste(filepath, '10000wordlist.csv',sep='/')) %>% 
            select(as.character(input$lang))
        ref$R = c(1:nrow(ref))
        names(ref)[1] = 'Word'
        ref = ref$Word
        
        ref.f = ref[(1:as.numeric(as.character(input$words)))] %>% as.character()
        ref.out <- tibble(Word = ref.f, Uses = as.integer(0))
        
        # For common/total %
        total_words = 0
        common_words = 0
        
        if(isTruthy(input$file)){
            
            content <- docx_summary(upload())
            
            # Bolds words that DON'T appear in top word list
            for(i in 1:nrow(content)){
                t = content$text[i] 
                # t = 'Hello my good sir!'
                t.s = tibble('word' = str_split(t, ' ')[[1]])
                t.s$strip = mapply(function(x) str_replace_all(x, "[^[:alpha:]]", ""), 
                                   t.s$word) %>% tolower()
                t.s$wordnum = mapply(function(x) which(x == ref.f), 
                                     t.s$strip) %>% as.integer()
                t.s$out = mapply(function(x,y) if(is.na(y)) { paste0('<b>',x,'</b>') } else {x},
                                 t.s$word, t.s$wordnum)
                unusual_words = t.s %>% filter(is.na(wordnum)) %>% select(strip) %>% group_by(strip) %>% count()
                names(unusual_words) = c('Word', 'Uses')
                
                # This creates the new context$text[i] for HTML rendering
                t.out = paste0(t.s$out, collapse = ' ')
                #Rewrites content
                content$text[i] = t.out
                
                # Tally all the most common words
                nums = t.s$wordnum[!is.na(t.s$wordnum)]
                while(length(nums)>0){
                    ref.out$Uses[nums[1]] = ref.out$Uses[nums[1]] + as.integer(1)
                    nums = nums[-1]
                }
            }
            
            out = paste0(content$text, collapse = '<br>')
            
        } else {
            content <- str_split(as.character(input$caption), '\n')[[1]]
            
            # Bolds words that DON'T appear in top word list
            for(i in 1:length(content)){
                t = content[i] 
                # t = 'Hello my good sir!'
                t.s = tibble('word' = str_split(t, ' ')[[1]])
                t.s$strip = mapply(function(x) str_replace_all(x, "[^[:alpha:]]", ""), 
                                   t.s$word) %>% tolower()
                t.s$wordnum = mapply(function(x) which(x == ref.f), 
                                     t.s$strip) %>% as.integer()
                t.s$out = mapply(function(x,y) if(is.na(y)) { paste0('<b>',x,'</b>') } else {x},
                                 t.s$word, t.s$wordnum)
                unusual_words = t.s %>% filter(is.na(wordnum)) %>% select(strip) %>% group_by(strip) %>% count()
                names(unusual_words) = c('Word', 'Uses')
                
                # This creates the new context$text[i] for HTML rendering
                t.out = paste0(t.s$out, collapse = ' ')
                #Rewrites content
                content[i] = t.out
                
                # Tally all the most common words
                nums = t.s$wordnum[!is.na(t.s$wordnum)]
                while(length(nums)>0){
                    ref.out$Uses[nums[1]] = ref.out$Uses[nums[1]] + as.integer(1)
                    nums = nums[-1]
                }
            }
            
            out = paste0(content, collapse = '<br>')
        }
        
        output$stats_table <- renderDataTable({
            return(ref.out)
        })
        
        output$unusual_word_table <- renderDataTable({
            return(unusual_words)
        })
        
        return(out)
    })
    
    output$text <- renderText({
        HTML(df())
    })
    
    
}

# Run the application 
shinyApp(ui = ui, server = server)