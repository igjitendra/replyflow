$files = Get-ChildItem -Path "src/content/templates" -Filter "*.md"
$industries = @('real-estate', 'retail', 'restaurant', 'clinic', 'salon')

$superCatRules = @(
    @{ id = 'loyalty-rewards'; regex = 'loyalty|membership|member|points|tier|stamp|birthday|anniversary|cashback|referral|milestone|vip-customer|vip-membership|reward|appreciation' },
    @{ id = 'retention-reengagement'; regex = 'inactive|miss-you|comeback|reengagement|repeat|refill|winback|abandoned|unused-coupon|price-drop|old-customer|comeback-offer|cart|recommendation|frequently-bought|preferred-category|viewed-product|stopped-responding|delayed-reminder' },
    @{ id = 'returns-support'; regex = 'return|exchange|refund|warranty|repair|damaged|complaint|support|ticket|installation|service|inspection|claim|policy|cancellation|cancelled|diagnosis|spare-part|replacement|missing-product|wrong-product' },
    @{ id = 'reminders-billing'; regex = 'payment|invoice|receipt|gst|upi|emi|due|balance|credit-note|advance|duplicate-payment|paid|price-list|price-enquiry|packaging-charge|pay-later|credit-reminder|outstanding' },
    @{ id = 'offers-promotions'; regex = 'sale|discount|bogo|offer|festive|clearance|combo|coupon|promo|deal|early-access|launch|black-friday|diwali|holi|eid|navratri|new-year|christmas|raksha|dussehra|independence|republic|buy|collection|essentials|hampers|vouchers|accessories|kids|mens|womens|handmade|budget|clearance|flash|weekday|weekend|morning|evening|annual|launch' }
)

function Get-SuperCat($purpose) {
    $p = $purpose.ToLower()
    foreach ($rule in $superCatRules) {
        if ($p -match $rule.regex) {
            return $rule.id
        }
    }
    return 'orders-shipping' # fallback
}

foreach ($ind in $industries) {
    Write-Host "===================="
    Write-Host "INDUSTRY: $ind"
    Write-Host "===================="
    $counts = @{
        'loyalty-rewards' = 0
        'retention-reengagement' = 0
        'offers-promotions' = 0
        'orders-shipping' = 0
        'returns-support' = 0
        'reminders-billing' = 0
    }
    
    foreach ($f in $files) {
        $content = Get-Content $f.FullName -Raw
        if ($content -match 'industry:\s*([^\r\n]+)') {
            $fInd = $matches[1].Trim()
            if ($fInd -eq $ind) {
                if ($content -match 'purpose:\s*([^\r\n]+)') {
                    $purpose = $matches[1].Trim()
                    $sc = Get-SuperCat $purpose
                    $counts[$sc]++
                }
            }
        }
    }

    foreach ($scKey in $counts.Keys) {
        Write-Host "  $scKey : $($counts[$scKey])"
    }
}
