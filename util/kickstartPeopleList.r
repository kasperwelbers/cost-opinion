## Just a simple R script to kickstart the 'people' list in content/pages/people.md
## Keeping it here just in case 

d = read.csv2('~/Downloads/WG_applications_export_23-09-2022.csv')

d = data.frame(
  name = paste(d$firstName, d$lastName, sep=' '),
  homepages = d$homepages,
  country = d$country,
  role = NA
)

set_role = function(d, name, role) {
  ascii <- function(x) iconv(x, to="ASCII//TRANSLIT")
  matches = ascii(d$name) == ascii(name)
  if (sum(matches) != 1) stop(sprintf('%s matches for %s', sum(matches), name))
  d$role[matches] = role 
  d
}

d = d |>
  set_role('Christian Baden', 'Action Chair') |>
  set_role('Helle Sjovaag', 'Action Vice Chair') |>
  set_role('Kasper Welbers', 'Grant Holder Scientific Representative') |>
  #set_role("Wouter van Atteveldt", "Grant Holder Vice Scientific Representative") |>
  set_role('Agnieszka Stepinska', "Theory Workgroup Leader") |>
  set_role("Damian Trilling", "Tools Workgroup Leader") |>
  set_role("Marina Popescu", "Data Management & Application Workgroup Leader") |>
  set_role("Carlos Arcila Calderon", "Inclusion & Dissemination Workgroup Leader")

## add GH manager (which might not be in member list)
d = rbind(d, data.frame(
  name = 'To be determined',
  homepages = 'vu homepage',
  country = 'Netherlands (NL)',
  role = 'Grant Holder Manager'
))

people = sapply(1:nrow(d), function(i) {
  wgs = which(d[i,grep('WG[1-4]', colnames(d))] == 'y')
  wgs = c('Theory','Tools','Data','Dissemination')[wgs]
  wgs = paste(wgs, collapse=', ')
  
  sprintf('- name: %s\n  homepage: %s\n  country: %s\n  workgroups: %s\n  role: %s', 
          d$name[i], d$homepages[i], d$country[i], wgs, d$role[i])
})

cat(paste(people, collapse='\n'))
