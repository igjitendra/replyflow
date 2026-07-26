export interface SuperCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const TOP_FEATURED_INDUSTRIES = [
  'real-estate',
  'retail',
  'restaurant',
  'clinic',
  'salon',
];

export const SUPER_CATEGORIES: SuperCategory[] = [
  {
    id: 'loyalty-rewards',
    name: 'Loyalty & Rewards',
    emoji: '💳',
    description: 'Points balance, membership tiers, birthday gifts & referral bonuses',
  },
  {
    id: 'retention-reengagement',
    name: 'Customer Retention',
    emoji: '🔄',
    description: 'Inactive win-back, repeat order reminders, refill alerts & cart recovery',
  },
  {
    id: 'offers-promotions',
    name: 'Offers & Discounts',
    emoji: '🏷️',
    description: 'Festival collections, BOGO deals, clearance sales & promo codes',
  },
  {
    id: 'orders-shipping',
    name: 'Orders & Delivery',
    emoji: '📦',
    description: 'Order status, dispatch tracking, pickup ready & catalog sharing',
  },
  {
    id: 'returns-support',
    name: 'Returns & Support',
    emoji: '🛠️',
    description: 'Returns, exchanges, warranty claims, repairs & customer care',
  },
  {
    id: 'reminders-billing',
    name: 'Payments & Billing',
    emoji: '💰',
    description: 'UPI payment links, GST invoices, EMI alerts & balance dues',
  },
];

export function getSuperCategoryForPurpose(purpose: string): SuperCategory {
  const p = purpose.toLowerCase();

  // Priority 1: Loyalty, Rewards, Reviews & Membership
  if (
    /loyalty|membership|member|points|tier|stamp|birthday|anniversary|cashback|referral|milestone|vip|reward|appreciation|gold-coin|gift|review|testimonial/.test(p)
  ) {
    return SUPER_CATEGORIES[0]; // loyalty-rewards
  }

  // Priority 2: Customer Retention, Re-engagement & Aftercare
  if (
    /inactive|miss-you|comeback|reengagement|repeat|refill|winback|abandoned|unused-coupon|price-drop|old-customer|comeback-offer|cart|recommendation|frequently-bought|preferred-category|viewed-product|stopped-responding|delayed-reminder|aftercare|followup|recovery/.test(p)
  ) {
    return SUPER_CATEGORIES[1]; // retention-reengagement
  }

  // Priority 3: Returns, Repairs & Customer Support
  if (
    /return|exchange|refund|warranty|repair|damaged|complaint|support|ticket|installation|service|inspection|claim|policy|cancellation|cancelled|diagnosis|spare-part|replacement|missing-product|wrong-product|emergency|discharge|recovery|snagging|verification/.test(p)
  ) {
    return SUPER_CATEGORIES[4]; // returns-support
  }

  // Priority 4: Payments, Invoices, Loans & Dues
  if (
    /payment|invoice|receipt|gst|upi|emi|due|balance|credit-note|advance|duplicate-payment|paid|price-list|price-enquiry|packaging-charge|pay-later|credit-reminder|outstanding|dues|loan|tax|khata|commission|leasing|fee|valuation/.test(p)
  ) {
    return SUPER_CATEGORIES[5]; // reminders-billing
  }

  // Priority 5: Discounts, Offers, Packages & Promotions
  if (
    /sale|discount|bogo|offer|festive|clearance|combo|coupon|promo|deal|early-access|launch|black-friday|diwali|holi|eid|navratri|new-year|christmas|raksha|dussehra|independence|republic|buy|collection|essentials|hampers|vouchers|accessories|kids|mens|womens|handmade|budget|clearance|flash|weekday|weekend|morning|evening|annual|launch|pitch|package|special|campaign/.test(p)
  ) {
    return SUPER_CATEGORIES[2]; // offers-promotions
  }

  // Priority 6: Orders, Delivery, Bookings & Appointments (Default fallback)
  return SUPER_CATEGORIES[3]; // orders-shipping
}
