export const gitlabish = {
  theme: 'base' as const,
  themeVariables: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontSize: '16px',
    background: 'transparent',

    primaryColor: '#EEF0FF',
    primaryTextColor: '#1F2330',
    primaryBorderColor: '#7C7FE3',
    lineColor: '#7C7FE3',

    secondaryColor: '#F5F7FA',
    secondaryTextColor: '#1F2330',
    secondaryBorderColor: '#C9D2E6',

    edgeLabelBackground: '#E9EAF6',
    clusterBkg: '#0B0E14',
    clusterBorder: '#2B3145',
  },
  themeCSS: `
    .label text { font-weight: 600; }
    .node rect, .node polygon {
      rx: 10px; ry: 10px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
    }
    .edgePaths path { stroke-width: 2px; }
    .cluster rect { rx: 12px; ry: 12px; }
  `,
}
