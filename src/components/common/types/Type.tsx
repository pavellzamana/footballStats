interface Team  {
    team_id: number
    team_name: string
    logo: string
}

interface TeamResults {
    home: string
    away: string
}

export interface IMatches{
    [key: string]: any
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

export interface ISeasons {
    league_id: number
    season: number
    country: string
    name: string
}

export interface ICountry {
    league_id: number
    name: string
    country: string
    type: string
}

export interface IDetails {
    fixture_id: number
    league_id: number
    league: {
        name: string
        country: string
        logo: string
        flag: string
    }
    event_date: string
    event_timestamp: number
    firstHalfStart: number
    secondHalfStart: number
    round: string
    status: string
    statusShort: string
    elapsed: number
    venue: string
    referee: string
    homeTeam: Team
    awayTeam: Team
    goalsHomeTeam: number
    goalsAwayTeam: number
    score: {
        halftime: string
        fulltime: string
        extratime?: string
        penalty?: string
    }
    events: {
        elapsed: number
        elapsed_plus?: number
        team_id: number
        teamName: string
        player_id: number
        player: string
        assist_id?: number
        assist: string
        type: string
        detail: string
        comments?: string
    }
    lineups: {}
    statistics: {}
    players: Array<any>
}

export interface IEvents {
    elapsed: number
    elapsed_plus?: number
    team_id: number
    teamName: string
    player_id: number
    player: string
    assist_id?: number
    assist: string
    type: string
    detail: string
    comments?: string
}