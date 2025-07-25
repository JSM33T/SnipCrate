import { AboutCardProps } from "../_client/cards";

const aboutCards: AboutCardProps[] = [
    {
        title: "Dynamic Snippet Repository",
        desc: "Discover, fork, and enhance code snippets with smart variable support. Share dynamic, customizable snippets—remix and build faster than ever.",
        features: [
            "Fork, remix & share in one click",
            "Dynamic variables in every snippet",
            "Supports JS, Python, CLI, and more",
        ],
        link: "/about/faq",
        buttonLabel: "Check Faqs",
    },
    {
        title: "Real Collaboration & Community",
        desc: "Join an active dev community—rate, comment, and follow others. Collaborate on code, build teams, and see what’s trending.",
        features: [
            "Fork, star & rate snippets",
            "Comment threads & direct replies",
            "Follow creators & grow your network",
        ],
        link: "https://github.com/JSM33T/SnipCrate",
        buttonLabel: "Source Code",
    },
    {
        title: "Instant Integration & Analytics",
        desc: "Embed snippets in your apps in seconds. Get instant analytics—track usage, discover what’s popular, and understand your impact.",
        features: [
            "1-click copy/embed for all languages",
            "Analytics for every snippet & user",
            "Public and personal stats dashboards",
        ],
        link: "/analytics",
        buttonLabel: "View Analytics",
    }
];

export default aboutCards;