// data/chart.ts

export const odyssey = `
graph TD
    A[GitLab MR Status Change<br/>Draft→Ready] --> B[GitLab Webhook Endpoint]
    B --> C[AWS Cloud]

    subgraph AWS["AWS Cloud"]
        D[Application Load Balancer ALB]
        E[ECS Fargate<br/>Amazon Q Service]
        F[Memory Bank<br/>Context System]
        G[Amazon Q<br/>Code Analysis]
        H[GitLab API<br/>Comment Posting]

        D --> E
        E --> F
        F --> G
        G --> H
    end

    C --> D
    H --> I[GitLab Merge Request<br/>AI-Generated Comments]

    subgraph Comments["AI-Generated Comments"]
        J[• Code quality suggestions<br/>• Security vulnerability detection<br/>• Performance optimization<br/>• Architecture recommendations<br/>• Disney-specific compliance]
    end

    I --> Comments
`
