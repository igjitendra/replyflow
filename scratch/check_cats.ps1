$files = Get-ChildItem -Path 'src/content/templates' -Filter 'retail-*.md'

$counts = @{
    'Loyalty, Rewards & Membership' = 0
    'Customer Retention & Re-engagement' = 0
    'Discounts, Offers & Collections' = 0
    'Orders, Delivery & Inventory' = 0
    'Returns, Repairs & Support' = 0
    'Payments, Invoices & Dues' = 0
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'purpose:\s*(.+)') {
        $p = $matches[1].Trim().ToLower()
        
        # Priority 1: Loyalty, Rewards & Membership
        if ($p -match 'loyalty|membership|member|points|tier|stamp|birthday|anniversary|cashback|referral|milestone|vip-customer|vip-membership|reward|appreciation') {
            $counts['Loyalty, Rewards & Membership']++
        }
        # Priority 2: Customer Retention & Re-engagement
        elseif ($p -match 'inactive|miss-you|comeback|reengagement|repeat|refill|winback|abandoned|unused-coupon|price-drop|old-customer|comeback-offer|cart|recommendation|frequently-bought|preferred-category|viewed-product|stopped-responding|delayed-reminder') {
            $counts['Customer Retention & Re-engagement']++
        }
        # Priority 3: Returns, Repairs & Support
        elseif ($p -match 'return|exchange|refund|warranty|repair|damaged|complaint|support|ticket|installation|service|inspection|claim|policy|cancellation|cancelled|diagnosis|spare-part|replacement|missing-product|wrong-product') {
            $counts['Returns, Repairs & Support']++
        }
        # Priority 4: Payments, Invoices & Dues
        elseif ($p -match 'payment|invoice|receipt|gst|upi|emi|due|balance|credit-note|advance|duplicate-payment|paid|price-list|price-enquiry|packaging-charge|pay-later|credit-reminder|outstanding') {
            $counts['Payments, Invoices & Dues']++
        }
        # Priority 5: Discounts, Offers & Collections
        elseif ($p -match 'sale|discount|bogo|offer|festive|clearance|combo|coupon|promo|deal|early-access|launch|black-friday|diwali|holi|eid|navratri|new-year|christmas|raksha|dussehra|independence|republic|buy|collection|essentials|hampers|vouchers|accessories|kids|mens|womens|handmade|budget|clearance|flash|weekday|weekend|morning|evening|annual|launch') {
            $counts['Discounts, Offers & Collections']++
        }
        # Priority 6: Orders, Delivery & Inventory (Fallback for operational retail templates)
        else {
            $counts['Orders, Delivery & Inventory']++
        }
    }
}

$counts.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize
