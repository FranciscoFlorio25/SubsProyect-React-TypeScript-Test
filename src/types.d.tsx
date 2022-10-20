export interface Sub{
    nick: string;
    avatar: string;
    subMonth: number;
    description?: string;
  }

  export type SubsResponseFromApi = Array<{
    nick: string;
    months:number;
    profileUrl: string;
    description:string;
  }>