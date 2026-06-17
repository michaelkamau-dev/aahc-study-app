import { useState, useEffect, useCallback, useRef } from "react";

const VOCAB = [
  ["Reconstruction", "Rebuilt after being destroyed"],
  ["Migration", "Move from one place to another"],
  ["Emancipation", "Being set free from enslavement"],
  ["Redistricting", "Drawing electoral district boundaries"],
  ["Jim Crow", "Legal practice of segregating Black people in the US"],
  ["Ordinances", "Laws set forth by governmental authority"],
  ["Anti-abolitionist", "Person against the end of slavery"],
  ["Segregation", "Enforced separation by race"],
  ["Regressive", "Moves backward"],
  ["Discrimination", "Unjust or prejudicial treatment"],
  ["Agricultural", "Cultivating a piece of land, or planting"],
  ["Sharecropper", "Tenant farmer who gives a part of each crop as rent"],
  ["Insurrection", "Violent uprising against an authority or government"],
  ["Harlem Renaissance", "A movement in Black American culture"],
  ["Improvisation", "Act of coming up with something on the spot"],
  ["Propagation", "Widely spreading and promoting ideas"],
  ["Poll tax", "A fee charged to vote, used to suppress Black voting"],
  ["Civil disobedience", "Breaking an unjust law on purpose, nonviolently, to expose injustice"],
  ["Desegregation", "Ending legally enforced separation"],
  ["Freedom Schools", "Temporary schools created to teach Black history, citizenship, and organizing"],
  ["Separate but equal", "The Plessy-era doctrine used to justify segregation"],
  ["Sit-in", "Staying seated in a segregated place and refusing to leave"],
  ["Voter intimidation", "Threats or violence meant to stop people from voting"],
];

const SECTIONS = {
  migration: {
    title: "Great Migration",
    emoji: "🚂",
    color: "#B45309",
    questions: [
      ["What was the Great Migration?", "Movement of Black Americans from the rural South to Northern and Western cities (1910–1970)."],
      ["Why did Black families leave the rural South?", "Racial violence, poverty, lack of jobs, and political oppression."],
      ["What does 'opening up' mean during this period?", "New job opportunities, political possibilities, and cultural spaces in Northern cities."],
      ["Name two push factors of the Great Migration.", "Jim Crow laws and racial violence."],
      ["Name two pull factors of the Great Migration.", "Industrial jobs and better wages."],
      ["How did World War I affect migration?", "Factories needed workers after European immigration slowed."],
      ["How did Southern landowners try to stop migration?", "Debt traps, threats, violence, and false arrests."],
      ["Why were train stations monitored in the South?", "To prevent Black workers from leaving."],
      ["What role did Black newspapers play in migration?", "They shared job ads and success stories."],
      ["What cities grew rapidly due to the Great Migration?", "Chicago, Detroit, New York, Philadelphia."],
    ]
  },
  housing: {
    title: "Housing & Economics",
    emoji: "🏠",
    color: "#9333EA",
    questions: [
      ["What housing problems did Black migrants face?", "Overcrowding, high rent, poor conditions."],
      ["Why were rents higher for Black families?", "Racial discrimination and limited housing options."],
      ["What is substandard housing?", "Housing that is unsafe, overcrowded, or poorly maintained."],
      ["How did landlords profit from segregation?", "Charging higher rent for worse housing."],
      ["How did housing inequality affect wealth building?", "Limited savings and home ownership."],
    ]
  },
  power: {
    title: "Power, Politics & Ideas",
    emoji: "⚡",
    color: "#0369A1",
    questions: [
      ["Who was W.E.B. Du Bois?", "A scholar and activist who demanded full civil rights immediately."],
      ["What was Du Bois's approach to equality?", "Political action, higher education, and protest."],
      ["Who was Booker T. Washington?", "An educator who promoted vocational training."],
      ["What was Washington's main philosophy?", "Economic self-help before political equality."],
      ["Why did Du Bois criticize Washington?", "He believed waiting for rights allowed injustice to continue."],
      ["How did these debates shape Civil Rights strategies?", "They influenced protest vs accommodation approaches."],
      ["What was The Crisis magazine?", "A publication of the NAACP edited by Du Bois."],
      ["What were Open Letters in The Crisis?", "Public letters demanding justice and exposing racism."],
      ["What federal departments were segregated under Wilson?", "Treasury, Navy, and Post Office."],
      ["Why did this upset Black leaders?", "Segregation increased discrimination at the national level."],
    ]
  },
  supremacy: {
    title: "White Supremacy",
    emoji: "⛓️",
    color: "#991B1B",
    questions: [
      ["What is white supremacy?", "The belief that white people are superior and should dominate society."],
      ["How did white supremacy affect voting?", "Poll taxes, literacy tests, and intimidation."],
      ["How did it affect economic independence?", "Job exclusion, wage gaps, and housing discrimination."],
      ["What role did violence play in maintaining supremacy?", "Lynchings and terror campaigns."],
      ["Why was segregation considered a system, not an accident?", "It was enforced by laws and institutions."],
    ]
  },
  war: {
    title: "War & Global Impact",
    emoji: "🎖️",
    color: "#065F46",
    questions: [
      ["How did Black soldiers experience the Civil War?", "Fought for freedom but faced discrimination."],
      ["How were Black WWII soldiers treated differently?", "Still segregated but gained global awareness."],
      ["What similarities existed between the wars?", "Unequal treatment despite service."],
      ["What differences existed between the wars?", "WWII soldiers returned more determined to demand rights."],
      ["How did military service fuel Civil Rights activism?", "Veterans challenged injustice at home."],
    ]
  },
  resistance: {
    title: "Garvey, Trotter & Resistance",
    emoji: "✊",
    color: "#7C2D12",
    questions: [
      ["Who was Marcus Garvey?", "A leader promoting Black pride and self-determination."],
      ["What did Garvey advocate for?", "Economic independence and global Black unity."],
      ["Who was William Monroe Trotter?", "A journalist and activist."],
      ["How did Trotter describe Black freedom?", "Full political and social equality."],
      ["Why were Garvey and Trotter controversial?", "They openly challenged white power structures."],
    ]
  },
  harlem: {
    title: "Harlem Renaissance",
    emoji: "🎷",
    color: "#A16207",
    questions: [
      ["What was the Harlem Renaissance?", "A cultural explosion of Black art and thought."],
      ["Why did it occur in Harlem?", "High Black population and creative freedom."],
      ["How did jazz influence the movement?", "It expressed Black life and innovation."],
      ["How did dance and music challenge stereotypes?", "They showed complexity and excellence."],
      ["What was the national impact of the Renaissance?", "Changed how Black culture was viewed worldwide."],
    ]
  },
  churches: {
    title: "Black Churches",
    emoji: "⛪",
    color: "#6B21A8",
    questions: [
      ["What role did Black churches play?", "Centers for leadership, education, and organizing."],
      ["How did Black churches differ from white churches?", "Focused on survival, justice, and community uplift."],
      ["Why were churches trusted spaces?", "They were owned and led by Black communities."],
      ["How did churches support the movement?", "Hosting meetings and developing leaders."],
      ["Why is this era considered foundational to Civil Rights?", "It built ideas, leadership, and resistance strategies."],
    ]
  },
  civilrights: {
    title: "Civil Rights Era",
    emoji: "🕊️",
    color: "#1E40AF",
    questions: [
      ["What was segregation?", "The forced separation of Black and white people in public and private life."],
      ["How did segregation laws reinforce racism?", "They legalized unequal treatment and denied Black Americans equal access to resources."],
      ["What were Jim Crow laws?", "State and local laws enforcing racial segregation in the South."],
      ["What Supreme Court case legalized segregation in 1896?", "Plessy v. Ferguson."],
      ["What did 'separate but equal' mean in practice?", "Separate facilities that were unequal and underfunded for Black people."],
      ["What case overturned school segregation in 1954?", "Brown v. Board of Education."],
      ["Why did Brown v. Board succeed where Plessy failed?", "It proved segregation caused psychological harm and violated equal protection."],
      ["What organization used the courts to fight segregation?", "The NAACP."],
      ["What event began the modern Civil Rights Movement in 1955?", "The Montgomery Bus Boycott."],
      ["Why was the Montgomery Bus Boycott effective?", "It used economic pressure and mass participation."],
      ["Who emerged as a national leader during the boycott?", "Dr. Martin Luther King Jr."],
      ["Who were the Little Rock Nine?", "Nine Black students who integrated Central High School in Arkansas."],
      ["Why was federal intervention needed in Little Rock?", "State officials resisted desegregation."],
      ["What were sit-ins?", "Nonviolent protests at segregated lunch counters."],
      ["What was the main goal of sit-ins?", "To desegregate public spaces."],
      ["Which group organized many sit-ins and youth protests?", "SNCC (Student Nonviolent Coordinating Committee)."],
      ["Why did SNCC become more radical over time?", "Frustration with slow progress and violent backlash."],
      ["What bombing killed four girls in 1963?", "The 16th Street Baptist Church bombing."],
      ["Why was the Birmingham church bombing significant?", "It shocked the nation and exposed racist violence."],
      ["Who was Medgar Evers?", "A civil rights leader assassinated for his activism."],
      ["What did Evers' assassination reveal?", "The dangers faced by civil rights activists."],
      ["What was the Birmingham Children's Crusade?", "Youth-led protests against segregation in Birmingham."],
      ["Why were children used in Birmingham protests?", "Adults faced arrest or job loss; children drew national attention."],
      ["What role did media play in 1957 and 1963?", "It showed violent racism to a national and global audience."],
      ["Which civil rights event took place in 1963 in Washington, D.C.?", "The March on Washington."],
      ["What was the main purpose of the March on Washington?", "To demand jobs and civil rights legislation."],
      ["What famous speech was delivered at the March?", "'I Have a Dream.'"],
      ["What was Freedom Summer (1964)?", "A campaign to register Black voters in Mississippi."],
      ["What were Freedom Schools?", "Schools teaching Black history, civics, and empowerment."],
      ["Why was Mississippi a focus of Freedom Summer?", "Extreme voter suppression and violence."],
      ["What law outlawed segregation in public places?", "The Civil Rights Act of 1964."],
      ["What did the Voting Rights Act of 1965 accomplish?", "It banned literacy tests and protected Black voting rights."],
      ["Why were some civil rights groups more radical than others?", "Different views on self-defense, integration, and power."],
      ["How did Malcolm X differ from Martin Luther King Jr.?", "Malcolm supported self-defense; King promoted nonviolence."],
      ["What is Black Nationalism?", "Belief in Black self-determination and pride."],
      ["Which group promoted Black self-defense and community programs?", "The Black Panther Party."],
      ["What were the Watts Riots (1965)?", "An uprising against police brutality and inequality in Los Angeles."],
      ["What did the Watts Riots reveal?", "Deep frustration with poverty and racism outside the South."],
      ["What was the Nation of Islam?", "A religious and political movement promoting Black independence."],
      ["Who led the Nation of Islam during this era?", "Elijah Muhammad."],
      ["Who was John Howard Griffin?", "A white journalist who lived as a Black man to expose racism."],
      ["What did Griffin learn from his experiment?", "Racism was constant, systemic, and dehumanizing."],
      ["Why did President Truman sign Executive Order 9981?", "To desegregate the U.S. military."],
      ["Did Executive Order 9981 work immediately?", "No, change was slow but long-lasting."],
      ["What was the Ku Klux Klan doing during this era?", "Using violence and intimidation to resist civil rights."],
      ["What impact did Dr. King's assassination have in 1968?", "Nationwide grief, anger, and riots."],
      ["What role did young people play in the movement?", "Protests, sit-ins, voter drives, and organizing."],
      ["Who was Fannie Lou Hamer?", "A voting rights activist brutally punished for organizing."],
      ["What consequences did Hamer face?", "Beatings, jail time, and economic retaliation."],
      ["Why did Myrlie Evers-Williams continue the fight after her husband's death?", "To honor his legacy and pursue justice and equality."],
    ]
  },
  women: {
    title: "Women of Civil Rights",
    emoji: "👑",
    color: "#BE185D",
    questions: [
      ["Who refused to give up her bus seat in 1955, sparking the Montgomery Bus Boycott?", "Rosa Parks."],
      ["What role did Rosa Parks hold before her arrest?", "NAACP secretary."],
      ["Who helped organize the Montgomery Bus Boycott behind the scenes?", "Jo Ann Robinson."],
      ["Which woman founded the Mississippi Freedom Democratic Party?", "Fannie Lou Hamer."],
      ["Who was the first Black woman elected to the U.S. Congress?", "Shirley Chisholm."],
      ["What was Shirley Chisholm's famous campaign slogan?", "'Unbought and Unbossed.'"],
      ["Who organized citizenship schools to help Black voters pass literacy tests?", "Septima Clark."],
      ["Why were citizenship schools important?", "They helped Black Americans register to vote."],
      ["Which civil rights organization did Ella Baker help form?", "SNCC (Student Nonviolent Coordinating Committee)."],
      ["What major Supreme Court case did Constance Baker Motley help litigate?", "Brown v. Board of Education."],
      ["Which Black woman broke barriers as a civil rights attorney and judge?", "Constance Baker Motley."],
      ["Which woman used music to express civil rights protest and Black pride?", "Nina Simone."],
      ["Which journalist led a campaign against lynching in the early 1900s?", "Ida B. Wells."],
      ["Why was Ida B. Wells' work important to the Civil Rights Movement?", "She exposed racial violence and injustice."],
      ["What organization did Dorothy Height lead?", "National Council of Negro Women."],
      ["Why were African American women essential to the Civil Rights Movement?", "They organized, led, educated, and sustained the movement."],
    ]
  },
  gaps: {
    title: "Nationals Gap Drill",
    emoji: "🎯",
    color: "#DC2626",
    questions: [
      ["Who was the NAACP attorney who argued Brown v. Board, then became the first Black Supreme Court Justice?", "Thurgood Marshall."],
      ["Who chaired SNCC, led the Selma marches, and was beaten on 'Bloody Sunday' in 1965?", "John Lewis."],
      ["Which SNCC leader popularized the phrase 'Black Power'?", "Stokely Carmichael."],
      ["Who organized the 1963 March on Washington and advised MLK on nonviolent strategy?", "Bayard Rustin."],
      ["Which woman helped organize the Freedom Rides and Nashville sit-ins, and kept the Rides going after violent attacks?", "Diane Nash."],
      ["Which writer and social critic explained the emotional realities of segregation to national audiences?", "James Baldwin."],
      ["Which Birmingham minister worked with MLK on the Birmingham Campaign despite repeated violence against him?", "Fred Shuttlesworth."],
      ["Who, at age six, integrated an all-white New Orleans school in 1960 under federal protection?", "Ruby Bridges."],
      ["Which teenager refused to give up her bus seat in Montgomery months before Rosa Parks?", "Claudette Colvin."],
      ["Which MLK advisor later became a Congressman, UN Ambassador, and Mayor of Atlanta?", "Andrew Young."],
      ["Which SCLC organizer helped lead the Selma voting rights marches and ran voter registration drives?", "Hosea Williams."],
      ["Which SNCC founding member later became an NAACP leader known for public speaking?", "Julian Bond."],
      ["Who founded the Brotherhood of Sleeping Car Porters and helped organize the March on Washington?", "A. Philip Randolph."],
      ["Who led the National Urban League, focusing on jobs and economic equality?", "Whitney Young Jr."],
      ["Who was the NAACP executive secretary who coordinated legal and legislative strategy during the movement?", "Roy Wilkins."],
      ["Who co-founded the Black Panther Party and ran programs like free breakfasts for children?", "Bobby Seale."],
      ["Which scholar-activist became known for civil rights, prison reform, and Black liberation work in the late 1960s?", "Angela Davis."],
      ["Whose 1955 murder caused national outrage and helped energize the movement?", "Emmett Till."],
      ["What 1960 protest sparked nationwide student sit-ins?", "The Greensboro sit-ins."],
      ["Who integrated Ole Miss in 1962 under federal enforcement?", "James Meredith."],
      ["What 1965 march for voting rights ran from Selma to Montgomery?", "The Selma to Montgomery marches."],
      ["What was 'Bloody Sunday' in 1965?", "The violent attack on marchers in Selma that shocked the nation."],
      ["What 1957 law was the first civil rights legislation since Reconstruction?", "The Civil Rights Act of 1957."],
      ["What 1968 law prohibited housing discrimination?", "The Fair Housing Act."],
      ["Which organization ran the Freedom Rides and promoted direct-action protest?", "CORE (Congress of Racial Equality)."],
      ["How did Malcolm X's approach differ from MLK's?", "Malcolm X emphasized Black self-determination and self-defense; King emphasized nonviolence and integration."],
      ["What was the difference between the NAACP's and SNCC's main strategies?", "NAACP fought mainly through the courts; SNCC used direct action and youth-led grassroots organizing."],
      ["Why did media coverage of Birmingham in 1963 matter?", "Televised police violence against protesters turned national opinion in favor of civil rights."],
      ["Why were children used in the Birmingham Children's Crusade?", "Adults risked arrest and job loss; youth marches drew national attention and exposed the violence."],
      ["What were the three major pieces of legislation the movement produced?", "Civil Rights Act of 1964, Voting Rights Act of 1965, Fair Housing Act of 1968."],
      ["What distinguished SCLC from SNCC?", "SCLC was church-based and led by established adult clergy under King; SNCC was student-led and more grassroots."],
      ["Why is the Montgomery Bus Boycott considered effective?", "It combined sustained economic pressure with mass community participation and produced a legal win."],
      ["What did the Nation of Islam emphasize compared to the SCLC?", "NOI stressed Black economic independence and separatism; SCLC stressed integration through nonviolence."],
    ]
  },
  foundations: {
    title: "Foundations 1800-1940",
    emoji: "⛓️",
    color: "#92400E",
    questions: [
      ["Who organized a major planned slave revolt in Virginia in 1800?", "Gabriel Prosser."],
      ["Who was accused of organizing a planned slave revolt in Charleston?", "Denmark Vesey."],
      ["Who led one of the most significant slave rebellions in U.S. history, in Virginia in 1831?", "Nat Turner."],
      ["Who was the abolitionist and women's rights speaker known for powerful oratory?", "Sojourner Truth."],
      ["Who escaped slavery and became the most famous Underground Railroad conductor and a Civil War spy?", "Harriet Tubman."],
      ["Who was the formerly enslaved abolitionist, writer, and statesman who became a leading voice against slavery?", "Frederick Douglass."],
      ["Who wrote 'Appeal to the Colored Citizens of the World'?", "David Walker."],
      ["Who was the poet, abolitionist, and reformer Frances Ellen Watkins ___?", "Harper."],
      ["Who was the first Black U.S. Senator?", "Hiram Revels."],
      ["Who was the first Black Senator to serve a full term?", "Blanche K. Bruce."],
      ["Who was the educator who founded Bethune-Cookman College?", "Mary McLeod Bethune."],
      ["Who was the entrepreneur and philanthropist who built a hair-care empire?", "Madam C.J. Walker."],
      ["Who was the agricultural scientist and educator known for his work with crops like peanuts?", "George Washington Carver."],
      ["Who was the Harlem Renaissance writer and anthropologist who wrote 'Their Eyes Were Watching God'?", "Zora Neale Hurston."],
      ["Who was the poet and leading voice of the Harlem Renaissance?", "Langston Hughes."],
      ["Who was the jazz composer, pianist, and bandleader central to the era?", "Duke Ellington."],
      ["Who was the influential blues singer of the 1920s known as the 'Empress of the Blues'?", "Bessie Smith."],
      ["Who was the singer, actor, athlete, and activist known for both performance and political courage?", "Paul Robeson."],
      ["Who won four gold medals at the 1936 Berlin Olympics?", "Jesse Owens."],
      ["What 1831 abolitionist newspaper did William Lloyd Garrison begin publishing?", "The Liberator."],
      ["What was the secret network that helped enslaved people escape to freedom?", "The Underground Railroad."],
      ["What 1850 law required escaped enslaved people to be returned even from free states?", "The Fugitive Slave Act."],
      ["What 1852 speech did Frederick Douglass give challenging the celebration of liberty during slavery?", "'What to the Slave Is the Fourth of July?'"],
      ["What 1857 Supreme Court decision ruled that Black people were not citizens?", "The Dred Scott decision."],
      ["What war from 1861 to 1865 was fought over slavery, secession, and federal power?", "The Civil War."],
      ["What 1863 proclamation declared enslaved people in Confederate-controlled areas free?", "The Emancipation Proclamation."],
      ["What 1865 amendment abolished slavery in the United States?", "The 13th Amendment."],
      ["What 1865 federal agency helped formerly enslaved people with education, labor, and legal support?", "The Freedmen's Bureau."],
      ["What 1866 law granted citizenship to people born in the U.S. and laid groundwork for the 14th Amendment?", "The Civil Rights Act of 1866."],
      ["What 1868 amendment established birthright citizenship and equal protection?", "The 14th Amendment."],
      ["What 1870 amendment prohibited denying the vote based on race?", "The 15th Amendment."],
      ["What 1820 compromise tried to balance slave and free states?", "The Missouri Compromise."],
      ["What 1854 act let settlers decide on slavery by popular sovereignty?", "The Kansas-Nebraska Act."],
      ["What 1867 laws divided the South into military districts and set rules for readmission to the Union?", "The Reconstruction Acts."],
      ["What 1875 law tried to ban racial discrimination in public accommodations?", "The Civil Rights Act of 1875."],
      ["What 1883 Supreme Court ruling weakened the Civil Rights Act of 1875?", "The Civil Rights Cases."],
      ["What 1917 case struck down racial zoning laws?", "Buchanan v. Warley."],
      ["What 1920 amendment gave women the right to vote, though Black women still faced discrimination?", "The 19th Amendment."],
      ["What 1930s legal cases involved race, due process, and fair trials in Alabama?", "The Scottsboro Boys cases."],
      ["What is chattel slavery?", "A system where enslaved people were treated as property."],
      ["What is emancipation?", "Freedom from slavery."],
      ["Who were 'freedmen'?", "Formerly enslaved people."],
      ["What is disenfranchisement?", "Taking away voting rights."],
      ["What was a literacy test used for?", "Blocking Black citizens from voting."],
      ["What was the grandfather clause?", "A voting loophole favoring white voters whose ancestors had voted before Black men gained voting rights."],
    ]
  },
  connections: {
    title: "Connections (Cause & Effect)",
    emoji: "🔗",
    color: "#7C3AED",
    questions: [
      ["Trace the chain: Rosa Parks' arrest leads to what, and what was the result?", "Parks' arrest -> Montgomery Bus Boycott -> MLK rises as a leader -> bus segregation ruled unconstitutional."],
      ["Trace the chain: Thurgood Marshall and the NAACP's legal strategy.", "Marshall + NAACP -> Brown v. Board (1954) -> overturned Plessy's 'separate but equal' -> ordered school desegregation."],
      ["Trace the chain: Emmett Till's murder and its effect.", "Till's 1955 murder -> open-casket funeral and media coverage -> national outrage -> helped energize the early movement."],
      ["Trace the chain: Selma marches to federal law.", "Selma marches / Bloody Sunday (1965) -> televised violence shifted opinion -> Voting Rights Act of 1965."],
      ["Trace the chain: Birmingham Campaign to federal law.", "Birmingham Campaign + Children's Crusade (1963) -> televised police violence -> pressure for the Civil Rights Act of 1964."],
      ["Trace the chain: Dred Scott to the Reconstruction Amendments.", "Dred Scott (1857) denied Black citizenship -> deepened tensions toward Civil War -> 13th, 14th, 15th Amendments."],
      ["Trace the chain: the March on Washington's purpose and result.", "March on Washington (1963) -> demanded jobs and civil rights -> built momentum for the Civil Rights Act of 1964."],
      ["Trace the chain: Plessy v. Ferguson's long-term effect.", "Plessy (1896) legalized 'separate but equal' -> decades of Jim Crow segregation -> finally overturned by Brown (1954)."],
      ["Trace the chain: Freedom Summer's purpose and result.", "Freedom Summer (1964) -> registered Black voters in Mississippi amid violence -> exposed suppression -> fed into the Voting Rights Act of 1965."],
      ["Why does 'person to event to law to impact' matter for this competition?", "Nationals tests broad context and connections, not isolated facts, so knowing how a figure links to an event, a law, and its impact is the key skill."],
      ["Connect the 13th, 14th, and 15th Amendments as a chain.", "13th abolished slavery -> 14th granted citizenship and equal protection -> 15th protected the right to vote regardless of race."],
      ["Connect the NAACP's founding to its biggest win.", "NAACP founded 1909 -> built a legal strategy over decades -> won Brown v. Board in 1954."],
    ]
  },
  presidents: {
    title: "Presidents & Their Era",
    emoji: "🏛️",
    color: "#1D4ED8",
    questions: [
      ["Who was president during the Civil War and the Emancipation Proclamation?", "Abraham Lincoln."],
      ["Which president signed the Emancipation Proclamation in 1863?", "Abraham Lincoln."],
      ["Who was president when federal troops enforced integration at Little Rock (1957)?", "Dwight D. Eisenhower."],
      ["Who was president during the Brown v. Board decision and early school integration?", "Dwight D. Eisenhower."],
      ["Who was president during the Birmingham Campaign and the March on Washington (1963)?", "John F. Kennedy."],
      ["Who was president who proposed the bill that became the Civil Rights Act before his assassination?", "John F. Kennedy."],
      ["Who was president who signed the Civil Rights Act of 1964 and Voting Rights Act of 1965?", "Lyndon B. Johnson."],
      ["Who was president who signed the Fair Housing Act of 1968?", "Lyndon B. Johnson."],
      ["Who was president who desegregated the military with Executive Order 9981 (1948)?", "Harry S. Truman."],
      ["Which president was in office during Selma and Bloody Sunday (1965)?", "Lyndon B. Johnson."],
      ["Which president oversaw the start of Reconstruction after Lincoln's assassination?", "Andrew Johnson."],
      ["Which president was associated with segregating federal departments (Treasury, Navy, Post Office)?", "Woodrow Wilson."],
    ]
  },
  vocabulary: {
    title: "Vocabulary",
    emoji: "📖",
    color: "#0D9488",
    questions: VOCAB,
  }
};

const allQuestions = Object.entries(SECTIONS).flatMap(([key, sec]) =>
  sec.questions.map((q, i) => ({ section: key, sectionTitle: sec.title, emoji: sec.emoji, color: sec.color, question: q[0], answer: q[1], id: `${key}-${i}` }))
);

// Team drill buckets — built from existing SECTIONS, with their own separate progress.
// Era split: Yosiah 1800-1900, Michael 1900-1940, Grace 1940-present.
const PRESIDENTS_BY_ERA = {
  yosiah: [
    ["Who was president during the Civil War and the Emancipation Proclamation?", "Abraham Lincoln."],
    ["Which president signed the Emancipation Proclamation in 1863?", "Abraham Lincoln."],
    ["Which president oversaw the start of Reconstruction after Lincoln's assassination?", "Andrew Johnson."],
  ],
  michael: [
    ["Which president was associated with segregating federal departments (Treasury, Navy, Post Office)?", "Woodrow Wilson."],
  ],
  grace: [
    ["Who was president who desegregated the military with Executive Order 9981 (1948)?", "Harry S. Truman."],
    ["Who was president when federal troops enforced integration at Little Rock (1957)?", "Dwight D. Eisenhower."],
    ["Who was president during the Brown v. Board decision and early school integration?", "Dwight D. Eisenhower."],
    ["Who was president during the Birmingham Campaign and the March on Washington (1963)?", "John F. Kennedy."],
    ["Who was president who proposed the bill that became the Civil Rights Act before his assassination?", "John F. Kennedy."],
    ["Who was president who signed the Civil Rights Act of 1964 and Voting Rights Act of 1965?", "Lyndon B. Johnson."],
    ["Who was president who signed the Fair Housing Act of 1968?", "Lyndon B. Johnson."],
    ["Which president was in office during Selma and Bloody Sunday (1965)?", "Lyndon B. Johnson."],
  ],
};

// Which SECTIONS keys belong to each person's era bucket
const ERA_SECTION_KEYS = {
  yosiah: ["foundations"],
  michael: ["migration", "housing", "power", "supremacy", "war", "resistance", "harlem", "churches"],
  grace: ["civilrights", "women", "gaps"],
};

const TEAM_BUCKETS = [
  {
    key: "yosiah", person: "Yosiah", era: "1800-1900", emoji: "1️⃣", color: "#92400E",
    cards: [
      ...ERA_SECTION_KEYS.yosiah.flatMap(k => SECTIONS[k].questions.map((q, i) => ({ question: q[0], answer: q[1], color: SECTIONS[k].color, id: `team-yosiah-${k}-${i}` }))),
      ...PRESIDENTS_BY_ERA.yosiah.map((q, i) => ({ question: q[0], answer: q[1], color: "#1D4ED8", id: `team-yosiah-pres-${i}` })),
    ],
  },
  {
    key: "michael", person: "Michael (you)", era: "1900-1940", emoji: "2️⃣", color: "#B45309",
    cards: [
      ...ERA_SECTION_KEYS.michael.flatMap(k => SECTIONS[k].questions.map((q, i) => ({ question: q[0], answer: q[1], color: SECTIONS[k].color, id: `team-michael-${k}-${i}` }))),
      ...PRESIDENTS_BY_ERA.michael.map((q, i) => ({ question: q[0], answer: q[1], color: "#1D4ED8", id: `team-michael-pres-${i}` })),
    ],
  },
  {
    key: "grace", person: "Grace", era: "1940-present", emoji: "3️⃣", color: "#1E40AF",
    cards: [
      ...ERA_SECTION_KEYS.grace.flatMap(k => SECTIONS[k].questions.map((q, i) => ({ question: q[0], answer: q[1], color: SECTIONS[k].color, id: `team-grace-${k}-${i}` }))),
      ...PRESIDENTS_BY_ERA.grace.map((q, i) => ({ question: q[0], answer: q[1], color: "#1D4ED8", id: `team-grace-pres-${i}` })),
    ],
  },
  {
    key: "everyone", person: "EVERYONE drills", era: "Connections + all Presidents", emoji: "🔗", color: "#7C3AED",
    cards: [
      ...SECTIONS.connections.questions.map((q, i) => ({ question: q[0], answer: q[1], color: SECTIONS.connections.color, id: `team-everyone-conn-${i}` })),
      ...SECTIONS.presidents.questions.map((q, i) => ({ question: q[0], answer: q[1], color: SECTIONS.presidents.color, id: `team-everyone-pres-${i}` })),
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function AAHCFlashcards() {
  const [mode, setMode] = useState("home");
  const [currentSection, setCurrentSection] = useState(null);
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(() => {
    try {
      const saved = localStorage.getItem("aahc-known");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [quizQueue, setQuizQueue] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    try {
      const saved = localStorage.getItem("aahc-best-streak");
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Persist progress so it survives page refreshes
  useEffect(() => {
    try {
      localStorage.setItem("aahc-known", JSON.stringify(known));
    } catch {}
  }, [known]);

  useEffect(() => {
    try {
      localStorage.setItem("aahc-best-streak", JSON.stringify(bestStreak));
    } catch {}
  }, [bestStreak]);

  // SEPARATE team-tab progress — own storage key, never touches main "known"
  const [tab, setTab] = useState("home");
  const [teamKnown, setTeamKnown] = useState(() => {
    try {
      const saved = localStorage.getItem("aahc-team-known");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("aahc-team-known", JSON.stringify(teamKnown));
    } catch {}
  }, [teamKnown]);

  const totalKnown = Object.values(known).filter(Boolean).length;
  const totalQuestions = allQuestions.length;
  const pct = Math.round((totalKnown / totalQuestions) * 100);

  const startSection = (key) => {
    const questions = key === "all"
      ? shuffle(allQuestions)
      : key === "missed"
      ? shuffle(allQuestions.filter(q => known[q.id] === false))
      : shuffle(allQuestions.filter(q => q.section === key));
    setDeck(questions);
    setCardIndex(0);
    setFlipped(false);
    setMode("study");
    setCurrentSection(key);
  };

  const startQuiz = () => {
    const questions = shuffle(allQuestions);
    setQuizQueue(questions);
    setCardIndex(0);
    setFlipped(false);
    setStreak(0);
    setMode("quiz");
  };

  // Launch a team bucket into the study UI; marks into teamKnown, not known
  const [teamMode, setTeamMode] = useState(false);
  const [currentBucket, setCurrentBucket] = useState(null);
  const startTeamBucket = (bucketKey, onlyMissed = false) => {
    const bucket = TEAM_BUCKETS.find(b => b.key === bucketKey);
    if (!bucket) return;
    const pool = onlyMissed
      ? bucket.cards.filter(c => teamKnown[c.id] === false)
      : bucket.cards;
    setDeck(shuffle(pool));
    setCardIndex(0);
    setFlipped(false);
    setTeamMode(true);
    setCurrentBucket(bucketKey);
    setMode("study");
  };

  const markCard = (gotIt) => {
    const card = mode === "quiz" ? quizQueue[cardIndex] : deck[cardIndex];
    if (card) {
      if (teamMode) {
        setTeamKnown(prev => ({ ...prev, [card.id]: gotIt }));
      } else {
        setKnown(prev => ({ ...prev, [card.id]: gotIt }));
      }
      if (gotIt) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
      } else {
        setStreak(0);
      }
    }
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    const maxIdx = mode === "quiz" ? quizQueue.length : deck.length;
    if (cardIndex + 1 < maxIdx) {
      setCardIndex(prev => prev + 1);
    } else {
      setMode("results");
    }
  };

  const currentCard = mode === "quiz" ? quizQueue[cardIndex] : deck[cardIndex];
  const currentMax = mode === "quiz" ? quizQueue.length : deck.length;
  const missedCount = allQuestions.filter(q => known[q.id] === false).length;

  if (mode === "home") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0C0C1D 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#E2E8F0",
        padding: "20px",
        maxWidth: 520,
        margin: "0 auto"
      }}>
        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <div style={{ fontSize: 42, marginBottom: 4 }}>🏆</div>
          <h1 style={{
            fontSize: 22,
            fontWeight: 800,
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 4px"
          }}>AAHC STUDY MODE</h1>
          <p style={{ color: "#94A3B8", fontSize: 13, margin: 0 }}>100 Black Men of Metro STL • Nationals June 17</p>
        </div>

        {/* Tab toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          <button onClick={() => setTab("home")} style={{
            flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer",
            border: tab === "home" ? "1px solid rgba(245,158,11,0.5)" : "1px solid rgba(255,255,255,0.08)",
            background: tab === "home" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.03)",
            color: tab === "home" ? "#F59E0B" : "#94A3B8", fontWeight: 700, fontSize: 13
          }}>📚 All Sections</button>
          <button onClick={() => setTab("team")} style={{
            flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer",
            border: tab === "team" ? "1px solid rgba(124,58,237,0.6)" : "1px solid rgba(255,255,255,0.08)",
            background: tab === "team" ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
            color: tab === "team" ? "#A78BFA" : "#94A3B8", fontWeight: 700, fontSize: 13
          }}>🤝 Drill My Section</button>
        </div>

        {tab === "team" && (
          <div>
            <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5, marginBottom: 16 }}>
              Team split for Nationals. Each person drills their era. Progress here is tracked separately from All Sections.
            </p>
            {TEAM_BUCKETS.map(b => {
              const total = b.cards.length;
              const knownCt = b.cards.filter(c => teamKnown[c.id]).length;
              const missedCt = b.cards.filter(c => teamKnown[c.id] === false).length;
              const bpct = total > 0 ? Math.round((knownCt / total) * 100) : 0;
              const isEveryone = b.key === "everyone";
              return (
                <div key={b.key} style={{
                  marginBottom: 12, padding: "14px 16px", borderRadius: 12,
                  background: isEveryone ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isEveryone ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{b.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: isEveryone ? "#C4B5FD" : "#E2E8F0" }}>{b.person}</div>
                      <div style={{ fontSize: 11, color: "#64748B" }}>{b.era} • {total} cards</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: bpct === 100 ? "#4ADE80" : "#94A3B8" }}>
                      {knownCt}/{total}
                    </div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ height: "100%", width: `${bpct}%`, background: b.color, borderRadius: 3, transition: "width 0.4s ease" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => startTeamBucket(b.key)} style={{
                      flex: 1, padding: "10px", borderRadius: 8, border: "none",
                      background: b.color, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer"
                    }}>Study ({total})</button>
                    {missedCt > 0 && (
                      <button onClick={() => startTeamBucket(b.key, true)} style={{
                        padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)",
                        background: "rgba(239,68,68,0.1)", color: "#FCA5A5", fontWeight: 600, fontSize: 13, cursor: "pointer"
                      }}>Missed ({missedCt})</button>
                    )}
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign: "center", padding: "12px 0", color: "#475569", fontSize: 11 }}>
              Lock your lane. Trust your team. 🗽
            </div>
          </div>
        )}

        {tab === "home" && (<>

        {/* Progress bar */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 16,
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: "#94A3B8" }}>Mastery Progress</span>
            <span style={{ color: "#F59E0B", fontWeight: 700 }}>{totalKnown}/{totalQuestions} ({pct}%)</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, #F59E0B, #EF4444)",
              borderRadius: 4,
              transition: "width 0.5s ease"
            }} />
          </div>
          {bestStreak > 0 && (
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 6 }}>
              🔥 Best streak: {bestStreak}
            </div>
          )}
          {(totalKnown > 0 || bestStreak > 0) && (
            <button onClick={() => {
              if (confirm("Reset all progress? This clears your mastery and best streak.")) {
                setKnown({});
                setBestStreak(0);
              }
            }} style={{
              marginTop: 10, background: "none", border: "none",
              color: "#64748B", fontSize: 11, cursor: "pointer",
              textDecoration: "underline", padding: 0
            }}>
              Reset progress
            </button>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button onClick={() => startSection("all")} style={{
            flex: 1, padding: "14px 12px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#0C0C1D", fontWeight: 700, fontSize: 14, cursor: "pointer"
          }}>
            🔀 ALL CARDS ({totalQuestions})
          </button>
          <button onClick={startQuiz} style={{
            flex: 1, padding: "14px 12px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #EF4444, #DC2626)",
            color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer"
          }}>
            ⚡ RAPID QUIZ
          </button>
        </div>

        {missedCount > 0 && (
          <button onClick={() => startSection("missed")} style={{
            width: "100%", padding: "12px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.3)",
            background: "rgba(239,68,68,0.1)", color: "#FCA5A5", fontWeight: 600,
            fontSize: 13, cursor: "pointer", marginBottom: 16
          }}>
            🎯 DRILL MISSED ONLY ({missedCount} cards)
          </button>
        )}

        {/* Sections */}
        <p style={{ fontSize: 12, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Study by Section</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {Object.entries(SECTIONS).map(([key, sec]) => {
            const sectionKnown = sec.questions.filter((_, i) => known[`${key}-${i}`]).length;
            const sectionTotal = sec.questions.length;
            const sectionPct = sectionTotal > 0 ? Math.round((sectionKnown / sectionTotal) * 100) : 0;
            return (
              <button key={key} onClick={() => startSection(key)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#E2E8F0", cursor: "pointer", textAlign: "left"
              }}>
                <span style={{ fontSize: 20, width: 28 }}>{sec.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{sec.title}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{sectionTotal} questions</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: sectionPct === 100 ? "#4ADE80" : "#94A3B8" }}>
                    {sectionPct === 100 ? "✅" : `${sectionKnown}/${sectionTotal}`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", padding: "20px 0 10px", color: "#475569", fontSize: 11 }}>
          New York is waiting. Let's get it. 🗽
        </div>
        </>)}
      </div>
    );
  }

  if (mode === "results") {
    const reviewDeck = mode === "quiz" ? quizQueue : deck;
    const progressStore = teamMode ? teamKnown : known;
    const sessionKnown = reviewDeck.filter(q => progressStore[q.id]).length;
    const sessionTotal = reviewDeck.length;
    const sessionPct = sessionTotal > 0 ? Math.round((sessionKnown / sessionTotal) * 100) : 0;
    const exitHome = () => { setTeamMode(false); setCurrentBucket(null); setMode("home"); setTab(teamMode ? "team" : "home"); };
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0C0C1D 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#E2E8F0",
        padding: "20px",
        maxWidth: 520,
        margin: "0 auto",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 64, marginTop: 60 }}>{sessionPct >= 80 ? "🔥" : sessionPct >= 50 ? "💪" : "📚"}</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "16px 0 8px" }}>Session Complete!</h2>
        <p style={{ fontSize: 18, color: "#F59E0B", fontWeight: 700 }}>{sessionKnown}/{sessionTotal} correct ({sessionPct}%)</p>
        {!teamMode && bestStreak > 0 && <p style={{ color: "#94A3B8", fontSize: 14 }}>🔥 Best streak: {bestStreak}</p>}
        {!teamMode && <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 8 }}>Overall mastery: {totalKnown}/{totalQuestions} ({pct}%)</p>}
        <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center" }}>
          <button onClick={exitHome} style={{
            padding: "14px 28px", borderRadius: 10, border: "none",
            background: "rgba(255,255,255,0.1)", color: "#E2E8F0",
            fontWeight: 600, fontSize: 14, cursor: "pointer"
          }}>← Back</button>
          {!teamMode && missedCount > 0 && (
            <button onClick={() => startSection("missed")} style={{
              padding: "14px 28px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #EF4444, #DC2626)",
              color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer"
            }}>Drill Missed ({missedCount})</button>
          )}
        </div>
      </div>
    );
  }

  // Study / Quiz mode
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0C0C1D 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#E2E8F0",
      padding: "20px",
      maxWidth: 520,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => { const wasTeam = teamMode; setTeamMode(false); setCurrentBucket(null); setMode("home"); setTab(wasTeam ? "team" : "home"); }} style={{
          background: "none", border: "none", color: "#94A3B8", fontSize: 14, cursor: "pointer", padding: 4
        }}>✕ Exit</button>
        <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}>
          {cardIndex + 1} / {currentMax}
        </span>
        {streak > 0 && <span style={{ fontSize: 13, color: "#F59E0B" }}>🔥 {streak}</span>}
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${((cardIndex + 1) / currentMax) * 100}%`,
          background: currentCard?.color || "#F59E0B",
          borderRadius: 2,
          transition: "width 0.3s ease"
        }} />
      </div>

      {/* Section tag */}
      {currentCard && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.05)", borderRadius: 20,
          padding: "4px 12px", fontSize: 12, color: "#94A3B8",
          alignSelf: "flex-start", marginBottom: 12
        }}>
          {currentCard.emoji} {currentCard.sectionTitle}
        </div>
      )}

      {/* Card */}
      {currentCard && (
        <div
          onClick={() => setFlipped(!flipped)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: flipped
              ? `linear-gradient(135deg, ${currentCard.color}22, ${currentCard.color}11)`
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${flipped ? currentCard.color + "44" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 16,
            padding: "32px 24px",
            marginBottom: 16,
            cursor: "pointer",
            minHeight: 240,
            transition: "all 0.3s ease",
            textAlign: "center"
          }}
        >
          {!flipped ? (
            <>
              <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>QUESTION</div>
              <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.5 }}>{currentCard.question}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 24 }}>tap to reveal answer</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 11, color: currentCard.color, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>ANSWER</div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5, color: "#F8FAFC" }}>{currentCard.answer}</div>
            </>
          )}
        </div>
      )}

      {/* Action buttons */}
      {flipped ? (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => markCard(false)} style={{
            flex: 1, padding: "16px", borderRadius: 12, border: "none",
            background: "rgba(239,68,68,0.15)", color: "#FCA5A5",
            fontWeight: 700, fontSize: 15, cursor: "pointer"
          }}>✗ Missed</button>
          <button onClick={() => markCard(true)} style={{
            flex: 1, padding: "16px", borderRadius: 12, border: "none",
            background: "rgba(74,222,128,0.15)", color: "#4ADE80",
            fontWeight: 700, fontSize: 15, cursor: "pointer"
          }}>✓ Got it!</button>
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} style={{
          padding: "16px", borderRadius: 12, border: "none",
          background: "rgba(255,255,255,0.08)", color: "#CBD5E1",
          fontWeight: 600, fontSize: 15, cursor: "pointer"
        }}>Show Answer</button>
      )}
    </div>
  );
}
