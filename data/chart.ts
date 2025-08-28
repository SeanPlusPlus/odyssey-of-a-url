// data/chart.ts

export const odyssey = `
flowchart TB

L[Laptop] --> DNS[DNS]
DNS --> CLOUD[Cloud Infrastructure]

%% return path
CLOUD --> HTML[HTML Payload]
HTML --> L
`
