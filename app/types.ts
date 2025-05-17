export type Performance = {
  song: string;
  artist: string;
  country: string;
};

export type DataItem = {
  id: number;
  occurred: string;
  type: string;
  name: string;
  description: string;
  penalty: string;
  performance_id: number;
  performance: Performance;
};
