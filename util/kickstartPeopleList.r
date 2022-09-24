## Just a simple R script to kickstart the 'people' list in content/pages/people.md
## Keeping it here just in case

## DATA FROM E-COST OVERVIEW
## The converted excel export from MC Participants
mc = read.csv('~/Downloads/cost_mc.csv')
## The csv export from WG Applications
d = read.csv2('~/Downloads/WG_applications_export_24-09-2022.csv')

## we'll need to merge the mc and d data, but its not a perfect match.
## some MC members are not (yet) in WGs. For these we have no
## homepage, and the country format is different.
mc$country = NA

fix_country <- function(d, code, country) {
  d$country[d$CTRY.. == code] = country
  d
}

## some country names we can get from the workgroup data
for (co in unique(mc$CTRY..)) {
  match = grepl(paste0('(',co,')'), unique(d$country))
  if (sum(match) == 1) {
    countryname = unique(d$country)[match]
    mc = fix_country(mc, co, countryname)
  }
}
## add the missing ones manually
unique(mc[is.na(mc$country),])
mc = mc |>
  fix_country('LU', 'Luxemburg (LU)') |>
  fix_country('SE', 'Sweden (SE)')

if (any(is.na(mc$country))) stop('Dude, you missed some countries')

d$workgroups = sapply(1:nrow(d), function(i) {
  wgs = which(d[i,grep('WG[1-4]', colnames(d))] == 'y')
  wgs= c("Theory", "Tools", "Data", "Dissemination")[wgs]
  wgs
})

d = data.frame(
  name = paste(d$firstName, d$lastName, sep=' '),
  homepages = d$homepages,
  country = d$country,
  email = d$email,
  role = NA,
  workgroups = d$workgroups,
  mc = d$email %in% mc$Email
)
add = mc[!mc$Email %in% d$email,]
add = data.frame(
  name = paste(add$Firstname, add$Lastname, sep=' '),
  homepages = '',
  country = add$country,
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
  #set_role("Wouter van Atteveldt", "GHSRV") |>
  set_role('Agnieszka Stepinska', "WG1L") |>
  set_role("Damian Trilling", "WG2L") |>
  set_role("Marina Popescu", "WG3L") |>
  set_role("Carlos Arcila Calderon", "WV4L")

## we won't publish the email address, just needed it
## for matching
d$email = NULL

## add GH manager (which might not be in member list)
d = rbind(d, data.frame(
  name = 'To be determined',
  homepages = 'vu homepage',
  country = 'Netherlands (NL)',
  role = 'GHM',
  workgroups = '',
  mc = FALSE
))

d$role[is.na(d$role)] = ''
people = sapply(1:nrow(d), function(i) {
  sprintf('- name: %s\n  homepage: %s\n  country: %s\n  workgroups: %s\n  role: %s\n  mc: %s',
          d$name[i], d$homepages[i], d$country[i], d$workgroups[i], d$role[i], as.numeric(d$mc[i]))
})

cat('people:\n', paste(people, collapse='\n'))
