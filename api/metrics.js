// api/metrics.js - TriUnity Protocol Clean API

export default async function handler(req, res) {
    // Security headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 's-maxage=5, stale-while-revalidate=10',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Strict-Transport-Security': 'max-age=31536000'
    };

    Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        const metrics = generateLiveMetrics();
        
        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            data: metrics,
            metadata: {
                api_version: '2.2.0',
                response_time_ms: Math.round(Math.random() * 50 + 10),
                cache_status: Math.random() > 0.7 ? 'HIT' : 'MISS'
            }
        });
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

function generateLiveMetrics() {
    const now = Date.now();
    const time = now / 1000;
    
    // Dynamic variation patterns
    const primary = Math.sin(time / 180) * 0.15;
    const secondary = Math.sin(time / 420) * 0.08;
    const micro = Math.sin(time / 45) * 0.05;
    const random = (Math.random() - 0.5) * 0.1;
    
    const variation = primary + secondary + micro + random;
    
    // Base performance metrics
    const base = {
        tps: 108000,
        block_time_ms: 85,
        health_percentage: 99.97,
        validator_count: 247,
        ai_confidence: 92.5,
        network_load: 0.68
    };
    
    // Calculate live metrics with realistic bounds
    const metrics = {
        // Core Performance
        tps: Math.max(75000, Math.floor(base.tps + (variation * 25000))),
        block_time_ms: Math.max(70, Math.min(120, Math.floor(base.block_time_ms + (variation * 20)))),
        finality_time_ms: Math.max(120, Math.floor(165 + (variation * 30))),
        
        // Network Health
        health_percentage: Math.min(99.99, Math.max(99.80, base.health_percentage + (variation * 0.15))),
        uptime_percentage: 99.987 + (Math.random() - 0.5) * 0.01,
        
        // Validator Network
        validator_count: Math.max(200, base.validator_count + Math.floor(variation * 60)),
        active_validators: Math.floor((base.validator_count + Math.floor(variation * 60)) * 0.95),
        
        // AI Consensus
        ai_mode: determineAIMode(variation),
        ai_confidence: Math.min(99.9, Math.max(85.0, base.ai_confidence + (variation * 6))),
        
        // Security
        quantum_security_level: '256-bit',
        security_audit_score: 98.7,
        
        // Network Load
        network_load: Math.min(0.95, Math.max(0.25, base.network_load + (variation * 0.20))),
        average_gas_price: Math.max(0.01, 0.12 + variation * 0.08),
        
        // Blockchain Data
        current_block_height: 19847392 + Math.floor(time / 85 * 1000),
        total_transactions: Math.floor(8472000 + variation * 2000000),
        
        // System Status
        last_block_timestamp: now - (Math.random() * 120000),
        protocol_version: '2.2.0',
        consensus_algorithm: 'TriUnity-PoS-AI'
    };
    
    return formatMetrics(metrics);
}

function determineAIMode(variation) {
    const currentHour = new Date().getUTCHours();
    const isBusinessHours = currentHour >= 8 && currentHour <= 18;
    
    if (Math.abs(variation) > 0.25) return 'Emergency';
    if (variation > 0.15 && isBusinessHours) return 'High-Performance';
    if (variation < -0.15) return 'Secure';
    if (isBusinessHours && variation > 0.05) return 'Optimal';
    return 'Balanced';
}

function formatMetrics(metrics) {
    // Round floating point values appropriately
    metrics.health_percentage = Math.round(metrics.health_percentage * 100) / 100;
    metrics.uptime_percentage = Math.round(metrics.uptime_percentage * 1000) / 1000;
    metrics.network_load = Math.round(metrics.network_load * 1000) / 1000;
    metrics.ai_confidence = Math.round(metrics.ai_confidence * 100) / 100;
    metrics.average_gas_price = Math.round(metrics.average_gas_price * 10000) / 10000;
    
    // Ensure integers
    metrics.validator_count = Math.floor(metrics.validator_count);
    metrics.active_validators = Math.floor(metrics.active_validators);
    metrics.current_block_height = Math.floor(metrics.current_block_height);
    metrics.total_transactions = Math.floor(metrics.total_transactions);
    
    return metrics;
}