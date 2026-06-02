import { useState, useEffect, useCallback, useRef } from "react";

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
  }
};

const allQuestions = Object.entries(SECTIONS).flatMap(([key, sec]) =>
  sec.questions.map((q, i) => ({ section: key, sectionTitle: sec.title, emoji: sec.emoji, color: sec.color, question: q[0], answer: q[1], id: `${key}-${i}` }))
);

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
  const [known, setKnown] = useState({});
  const [quizQueue, setQuizQueue] = useState([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showVocab, setShowVocab] = useState(false);
  const [vocabFlipped, setVocabFlipped] = useState({});

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

  const markCard = (gotIt) => {
    const card = mode === "quiz" ? quizQueue[cardIndex] : deck[cardIndex];
    if (card) {
      setKnown(prev => ({ ...prev, [card.id]: gotIt }));
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

        {/* Vocab section */}
        <button onClick={() => setShowVocab(!showVocab)} style={{
          width: "100%", padding: "12px", borderRadius: 10, marginTop: 12,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          color: "#94A3B8", fontWeight: 600, fontSize: 13, cursor: "pointer"
        }}>
          📖 VOCABULARY ({VOCAB.length} terms) {showVocab ? "▲" : "▼"}
        </button>
        {showVocab && (
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
            {VOCAB.map((v, i) => (
              <div key={i} onClick={() => setVocabFlipped(prev => ({ ...prev, [i]: !prev[i] }))}
                style={{
                  padding: "10px 14px", borderRadius: 8,
                  background: vocabFlipped[i] ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${vocabFlipped[i] ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)"}`,
                  cursor: "pointer", fontSize: 13
                }}>
                <span style={{ fontWeight: 600, color: "#F59E0B" }}>{v[0]}</span>
                {vocabFlipped[i] && <span style={{ color: "#CBD5E1" }}> — {v[1]}</span>}
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", padding: "20px 0 10px", color: "#475569", fontSize: 11 }}>
          New York is waiting. Let's get it. 🗽
        </div>
      </div>
    );
  }

  if (mode === "results") {
    const reviewDeck = mode === "quiz" ? quizQueue : deck;
    const sessionKnown = reviewDeck.filter(q => known[q.id]).length;
    const sessionTotal = reviewDeck.length;
    const sessionPct = Math.round((sessionKnown / sessionTotal) * 100);
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
        {bestStreak > 0 && <p style={{ color: "#94A3B8", fontSize: 14 }}>🔥 Best streak: {bestStreak}</p>}
        <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 8 }}>Overall mastery: {totalKnown}/{totalQuestions} ({pct}%)</p>
        <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center" }}>
          <button onClick={() => setMode("home")} style={{
            padding: "14px 28px", borderRadius: 10, border: "none",
            background: "rgba(255,255,255,0.1)", color: "#E2E8F0",
            fontWeight: 600, fontSize: 14, cursor: "pointer"
          }}>← Back</button>
          {missedCount > 0 && (
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
        <button onClick={() => setMode("home")} style={{
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
