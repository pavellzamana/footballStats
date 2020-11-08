type Team = {
    team_id: number
    team_name: string
    logo: string
}
export interface IMatches {
    awayTeam: Team
    elapsed: number
    eventDate: string
    event_timestamp: number
    firstHalfStart: null | number
    fixture_id: number
    goalsAwayTeam: number
    goalsHomeTeam: number
    homeTeam: Team
    league: {
        name: "Premier League"
        country: "England"
        logo: "https://media.api-sports.io/football/leagues/39.png"
        flag: "https://media.api-sports.io/flags/gb.svg"
    }
    league_id: number
    referee: string
    round: string
    score: {halftime: string
            fulltime: string
            extratime: null
            penalty: null}
    secondHalfStart: number
    status: string
    statusShort: string
    venue: string
}