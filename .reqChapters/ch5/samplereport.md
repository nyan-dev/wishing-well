# ch-5 Personal Project — Report

## Project

- **GitHub username:** @SiThuTun-mdy
- **Repo URL:** https://github.com/SiThuTun-mdy/fast-order
- **Live / download URL:** https://fast-order-demo.vercel.app/

## AI Tools Used

- **Context7 MCP** — Live library documentation for Next.js , Supabase, Shadcn UI, TanStack , . Used by Plan, Implement, and Security agents to ensure API calls.
- **GitHub MCP** — Pull request creation, issue management, code review requests, and repository analysis. 
- **Playwright MCP** — Browser automation for 100+ E2E tests. Used by QA Agent and Developer Agent to verify UI, test workflows, and debug frontend issues.
- **Claude-Mem MCP** — Cross-session project memory for persisting decisions, observations, and context across conversations.
- **Supabase MCP** — Database schema inspection, RLS policy review, and migration management. Used by Architect Agent and Security Agent.
- **Vercel MCP** — Used to deployment process and debugging deploy error.

### Skill (required)

- **path:** `.claude/skills/user-order-flow.md` , 
- **what:** created to enforce the development flow for the ordering web app.
The customer journey is: `MenuPage` → add to cart (`CartContext`) → `CartPage` → `CheckoutPage` → `createOrder` → redirect to `OrderStatusPage` → `useOrder` polls until ready.

### Subagent (required)

- **path:** `.claude/agents/developer-agent.md`
- **what:** Senior Full Stack Developer agent responsible for implementing approved specifications. Equipped with Context7 (live API docs), GitHub (PRs, issues), Playwright (browser UI verification), and Supabase (database access) MCP tools.  Delivers reusable components, API routes, business logic, and tests aligned with the approved specification. 

Supabase , Playwright and vercel are the most tools and trigger I've been using.

## Trigger / Command
- Editing `src/` UI → `design-system` agent
- Editing cart/checkout/order routes → `user-order-flow` skill
- Any code change → `code-reviewer` agent before commit

## Tech-Stack Slides

- **Slides path:** slides/pitch.md

## User Feedback (pick ONE — use just one template)
- **Feedback file path:** feedback/feedback-template.md
- **Open issues:** https://github.com/SiThuTun-mdy/fast-order/issues/14

### Interview Notes — FastOrder Product Feedback

**Interviewer:**  Si Thu (@Sithutun-mdy)
**Date:** July  2026
**Product:** Fast Order — https://fast-order-demo.vercel.app/:** The live demo (menu browsing, cart, checkout, order tracking) and was shown the cashier, kitchen, and admin screens.

---
#### Interview 1: Small Business

**Q: Let's start simply — does this app appeal to you?**
> Honestly, yes. The first thing I noticed is that it doesn't try to do too much. I open the menu page and I immediately see food photos, categories across the top — burgers, drinks, desserts — and an "Add" button. My customers are not tech people. If my aunties can order milk tea without asking my staff for help, that's the whole test, and I think they could.

**Q: What specifically appealed to you?** 
> Three things. The menu-first design — no login wall, no app download, customers just open a link and order. Second, the order status page. Customers always shout "is my food ready?" across the shop. That live stepper — Confirmed, then Kitchen, then Ready — answers the question before they ask it. Third, the dine-in versus takeout choice with a table number at checkout. That tells me whoever built this has actually watched how a small food shop runs.

**Q:Anything that put you off?** 
> The look is clean but a bit generic. If I put this in front of customers, I'd want my shop's name, my colors, my logo. Right now it feels like a demo, not *my* shop. But that's polish, not a dealbreaker.

**Q: Second question — is this app simple enough for you to actually use and start running your small business on it?** 
> For the customer side, absolutely. There's nothing to learn — menu, cart, checkout, done. Checkout only asks for a name and phone number, which is right. Every extra field loses an order.

**Q: And the staff side?** 
>  Also manageable. I liked that there are separate screens for separate jobs — my cook only sees the kitchen queue, my cashier only sees the cashier screen, and I get the admin page to edit the menu and prices myself. I don't need to call a developer to change the price of noodles. That separation keeps each screen simple, which matters because my staff turnover is high — I need to train someone in an afternoon.

**Q: Where does "simple" break down for you?** 
> Setup. Using the app is simple; *getting* the app is not — for me. I was told it needs two deployments, a database account, environment variables... I don't know what any of that is. If you set it up for me and hand me a link and an admin password, I'm running the same day. If I have to do it myself, I'm stuck at step one. So: simple to operate, not yet simple to adopt.

**Q: Fair. Last question — what could be improved? Give us your top two pieces of feedback.** 
> **First: payment.** Right now the customer orders and the app assumes they'll pay at the counter. That works for dine-in, but for takeout orders placed ahead, I want money before I cook. Even simple options would do — a QR payment upload (KBZPay, WavePay, or whatever is local), or at minimum a "paid / unpaid" flag the cashier can toggle so I can track who still owes me. No payment tracking means I'm still keeping a paper notebook next to the tablet, and then why do I have the tablet?

**Q: And the second?** 
> **Second: a daily sales summary.** At closing time I need to know: how many orders today, total revenue, and which items sold. Right now I'd have to scroll through the order list and add it up on a calculator. One simple end-of-day report screen — today's order count, today's total, top five items — would change this from "a nicer way to take orders" into "a tool that runs my business." That's also what would make me pay for it, honestly. The ordering flow saves my staff time, but the sales report saves *me* time.

**Q: If we shipped those two things, would you switch from your current pen-and-paper system?** 
> With payment tracking and a daily report, yes — I'd trial it for a month. The bones are right: customers can use it without help, staff can learn it in a day, and I can manage the menu myself. It just needs to close the loop on money.

---

## Summary of Findings

| Question | Verdict |
|---|---|
| 1. Does the app appeal? | **Yes** — no-login menu-first ordering, live order status, and dine-in/takeout support fit real small-shop workflows. Branding/customization is the main gap in appeal. |
| 2. Simple enough to start a small business? | **Yes to operate, no to set up** — customer and staff flows need almost no training, but the two-app deployment + Supabase setup is beyond a non-technical owner. Needs a hosted/one-click onboarding path. |
| 3. Improvements (2 feedback items) | **(1)** Payment support — at minimum a paid/unpaid status per order, ideally local QR payment options. **(2)** Daily sales summary — order count, revenue total, and top-selling items at end of day. |
