interface Team  {
    team_id: number
    team_name: string
    logo: string
}
export interface IMatches {
    awayTeam: Team
    elapsed: number
    eventDate: string
    event_timestamp: number
    firstHalfStart: number
    fixture_id: number
    goalsAwayTeam: number
    goalsHomeTeam: number
    homeTeam: Team
    league: {
        name: string
        country: string
        logo: string
        flag: string
    }
    league_id: number
    referee: string
    round: string
    score: {
        halftime: string
        fulltime: string
        extratime?: string
        penalty?: string
    }
    secondHalfStart: number
    status: string
    statusShort: string
    venue: string
}

