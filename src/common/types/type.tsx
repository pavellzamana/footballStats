type AwayTeam = {
    team_id: number
    team_name: string
    logo: string
}

type HomeTeam = {
    team_id: number
    team_name: string
    logo: string
}

type League = {
    name: "Premier League"
    country: "England"
    logo: "https://media.api-sports.io/football/leagues/39.png"
    flag: "https://media.api-sports.io/flags/gb.svg"
}

type Score = {
    halftime: string
    fulltime: string
    extratime: null
    penalty: null
}

export interface IMatches {
    awayTeam: AwayTeam
    elapsed: number
    eventDate: string
    event_timestamp: number
    firstHalfStart: null | number
    fixture_id: number
    goalsAwayTeam: number
    goalsHomeTeam: number
    homeTeam: HomeTeam
    league: League
    league_id: number
    referee: string
    round: string
    score: Score
    secondHalfStart: number
    status: string
    statusShort: string
    venue: string
}