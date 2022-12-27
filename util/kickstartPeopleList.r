## Just a simple R script to kickstart the 'people' list in content/pages/people.md
## Keeping it here just in case
library(tidyverse)

## DATA FROM E-COST OVERVIEW
## The converted excel export from MC Participants
mc = read_csv('~/Downloads/cost_mc.csv')
## The csv export from WG Applications
d = read_csv2('~/Downloads/WG_applications_export_27-12-2022.csv') %>%
  filter(status == 'approved')
countries = read_csv('~/projects/cost-opinion/util/countries.csv')

## first make sure mc and d match with country data
fix_country_code <- function(x) {
  x[x == 'UK'] = 'GB'
  x[x == 'EL'] = 'GR'
  x[x == 'KV'] = 'XK'
  x
}
mc$country_code = mc$`CTRY *` %>% fix_country_code
d$country_code = str_extract(d$country, '(?<=\\()[A-Z]+(?=\\))') %>% fix_country_code

## if there are mismatches left, add them to fix countries
mismatches = unique(c(mc$country_code, d$country_code))
mismatches[!mismatches %in% countries$code]

d$workgroups = sapply(1:nrow(d), function(i) {
  wgs = which(d[i,grep('WG[1-4]', colnames(d))] == 'y')
  wgs= c("Theory", "Tools", "Data", "Dissemination")[wgs]
  paste0(wgs, collapse=';')
})


d = data.frame(
  name = paste(d$firstName, d$lastName, sep=' '),
  homepages = d$homepages,
  country_code = d$country_code,
  email = d$email,
  role = NA,
  workgroups = d$workgroups,
  mc = d$email %in% mc$Email
)

add = mc[!mc$Email %in% d$email,]
add = data.frame(
  name = paste(add$Firstname, add$Lastname, sep=' '),
  homepages = '',
  country_code = add$country_code,
  email = add$Email,
  role = NA,
  workgroups = '',
  mc = TRUE
)
d = rbind(d, add)

set_role = function(d, name, role) {
  ascii <- function(x) iconv(x, to="ASCII//TRANSLIT")
  matches = ascii(d$name) == ascii(name)
  if (sum(matches) != 1) stop(sprintf('%s matches for %s', sum(matches), name))
  d$role[matches] = role
  d
}

d = d |>
  set_role('Christian Baden', 'AC') |>
  set_role('Helle Sjovaag', 'ACV') |>
  set_role('Kasper Welbers', 'GHSR') |>
  set_role("Wouter van Atteveldt", "GHSRV") |>
  set_role('Agnieszka Stepinska', "WG1L") |>
  set_role("Damian Trilling", "WG2L") |>
  set_role("Marina Popescu", "WG3L") |>
  set_role("Carlos Arcila Calderon", "WG4L") |>
  set_role('Nina Springer', 'GAC') |>
  set_role('Ana Milojevic', 'WG4V2')

## we won't publish the email address, just needed it
## for matching
d$email = NULL

## add GH manager (which might not be in member list)
d = rbind(d, data.frame(
  name = 'Ruud van Ooijen',
  homepages = 'https://vu.nl',
  country_code = 'NL',
  role = 'GHM',
  workgroups = '',
  mc = FALSE
))

d$role[is.na(d$role)] = ''
d$homepages[is.na(d$homepages)] = ''

people = sapply(1:nrow(d), function(i) {
  workgroups = strsplit(d$workgroups[i], ';')[[1]]
  workgroups = paste(paste('    -', workgroups), collapse='\n')
  sprintf('- name: %s\n  homepage: %s\n  country: %s\n  workgroups:\n%s\n  role: %s\n  mc: %s',
          d$name[i], d$homepages[i], d$country_code[i], workgroups, d$role[i], as.numeric(d$mc[i]))
})
## create yaml string for people
cat('people:\n', paste(head(people,50), collapse='\n'))

## create option array for countries in config.js
items = sprintf('{label: "%s", value: "%s"}', countries$name, countries$code)
cat('[', paste(items, collapse=','), ']')

