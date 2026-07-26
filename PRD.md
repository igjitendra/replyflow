# PRD.md

> Product Requirements Document — ReplyFlow ka "kya" aur "kyun". Yeh single source of truth hai product scope ke liye.

## 1. Overview
**ReplyFlow** ek multi-channel Business Communication Hub hai — duniya ki sabse badi business message template library. Chhote aur medium businesses ke liye har communication channel (WhatsApp, SMS, Email, Instagram, etc.) ke liye ready-to-use, professional message templates ek hi jagah.

**Tagline:** *Find the perfect message in seconds.*

## 2. Problem Statement
Chhote businesses ke paas time, copywriter ya marketing team nahi hoti. Har roz unhe likhna padta hai:
- Lead ko follow-up message
- Payment/EMI reminder
- Festival wishes
- Complaint ka professional jawab
- Google review ka reply

Aaj yeh sab manual, inconsistent aur time-consuming hai. Existing tools ya toh sirf WhatsApp par focused hain, ya paid/complex CRM ke andar chhupe hue hain.

## 3. Target Users (Personas)
| Persona | Description | Core Need |
| --- | --- | --- |
| Dukaandaar / Retailer | Local shop owner | Quick WhatsApp/SMS replies |
| Real Estate Agent | Leads + site visits handle karta hai | Follow-up + booking templates |
| Clinic / Salon Owner | Appointments manage karta hai | Reminders + confirmations |
| Freelancer | Client communication | Proposals, invoices, follow-ups |
| Agency / Marketer | Multiple clients ke liye content | Bulk, multi-channel templates |

## 4. Goals & Success Metrics
**Goals**
- Har industry ke liye high-quality templates provide karna
- Message dhoondhne se copy karne tak < 10 seconds
- Multi-language (Hindi / English / Hinglish)

**Success Metrics (North Star + supporting)**
- North Star: Templates copied per week
- Weekly active users (WAU)
- Search-to-copy conversion rate
- Avg. time to find a template
- Returning user rate
- Templates favorited / saved

## 5. Features
### MVP (v1)
- Industry-based browsing
- Channel-based filtering
- Full-text client-side search (Pagefind)
- Template page: Title, Message, Copy button
- Metadata tags (Objective, Tone, Language, Industry)
- Mobile-first responsive UI

### v2+
- Favorites / Collections
- AI Rewrite (local API key)
- WhatsApp Chat Preview
- PWA (offline access)
- User Accounts
- AI Template Generator
- Analytics dashboard

## 6. User Stories
- Ek retailer ke roop mein, main apni industry select karke turant follow-up message copy karna chahta hoon.
- Ek agent ke roop mein, main Hinglish tone mein site-visit reminder chahta hoon.
- Ek user ke roop mein, main template ko edit karke apne customer ka naam daalna chahta hoon.
- Ek power user ke roop mein, main apne favorite templates save karna chahta hoon.

## 7. Non-Goals (v1 mein NAHI)
- Direct message sending / WhatsApp API integration
- CRM ya contact management
- Team collaboration features
- Paid subscription (pehle free + traffic build karo)

## 8. Assumptions & Constraints
- Content static generate hoga (SSG) — fast + cheap hosting
- AI features user ki apni API key par chalenge (cost hum par nahi)
- SEO primary growth channel hoga (organic search)
- Architecture 10,000+ templates tak scale kare bina redesign
