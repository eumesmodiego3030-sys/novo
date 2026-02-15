# Quick Reference Guide 🚀

## Essential Files to Know

### 📚 Documentation (Start Here!)
| Document | Time | Purpose |
|----------|------|---------|
| [STATUS_EXECUTIVO_PT.md](STATUS_EXECUTIVO_PT.md) | 5 min | **Start here** - Business overview |
| [PHASE5_QUICKSTART.md](PHASE5_QUICKSTART.md) | 10 min | Get running in 5 minutes |
| [PHASE5_COMPLETE.md](PHASE5_COMPLETE.md) | 20 min | Complete feature guide |
| [PHASE5_ARCHITECTURE.md](PHASE5_ARCHITECTURE.md) | 30 min | Technical deep dive |
| [DEVELOPMENT_JOURNEY.md](DEVELOPMENT_JOURNEY.md) | Ref | Full project history |

### 🔧 Core Services (New in Phase 5)
| File | Purpose | Status |
|------|---------|--------|
| [src/services/sentry.tsx](src/services/sentry.tsx) | Analytics & error tracking | ✅ Ready |
| [src/services/email.ts](src/services/email.ts) | Email notifications | ✅ Ready |
| [src/components/OptimizedImageV2.tsx](src/components/OptimizedImageV2.tsx) | Image optimization | ✅ Ready |

### ⚙️ Configuration
| File | Purpose | Action |
|------|---------|--------|
| [.env.example](.env.example) | **Copy to .env.local** | ✅ Template ready |
| [.env.local](#) | Your configuration | ⏳ You create this |

### 📦 Modified Components
| File | Change | Status |
|------|--------|--------|
| [src/App.tsx](src/App.tsx) | Added Sentry init | ✅ Done |
| [src/components/AdvancedForm.tsx](src/components/AdvancedForm.tsx) | Email + analytics | ✅ Done |

---

## 5-Minute Setup

```bash
# 1. Copy configuration template
cp .env.example .env.local

# 2. Get API keys (10 minutes each):
# - Resend: https://resend.com → Copy API key
# - Sentry: https://sentry.io → Copy DSN

# 3. Edit .env.local with your keys
nano .env.local

# 4. Test
npm run dev

# 5. Deploy!
npm run build
# Push to Vercel/Netlify
```

---

## Command Cheat Sheet

```bash
# Development
npm run dev         # Start dev server (http://localhost:8085)
npm run build       # Production build
npm run preview     # Preview production build locally
npm run lint        # Check code quality
npm run test        # Run tests

# Git
git add .
git commit -m "Phase 5: Analytics, Email, Images"
git push origin main

# Diagnostics
npm run build 2>&1 | grep error  # Check for build errors
```

---

## External Services (Get API Keys)

### 📧 Email (Choose One)

**Resend** (Recommended - Easiest)
- Visit: https://resend.com
- Sign up: Free
- Get API Key from dashboard
- Add to `.env.local`:
  ```
  VITE_EMAIL_API_KEY=re_your_key_here
  ```
- Max free: 100 emails/day

**SendGrid** (For Scale)
- Visit: https://sendgrid.com
- Sign up: Free
- Generate API Key
- Add to `.env.local`:
  ```
  VITE_EMAIL_API_KEY=SG.your_key_here
  ```
- Max free: 100 emails/day

### 📊 Analytics (Optional)

**Sentry** (Recommended - Free)
- Visit: https://sentry.io
- Sign up: Free
- Create React project
- Copy DSN from settings
- Add to `.env.local`:
  ```
  VITE_SENTRY_DSN=https://key@sentry.io/project_id
  ```
- Max free: 5,000 events/month

---

## Testing Your Setup

### ✅ Email Works?
1. Open http://localhost:8085
2. Fill contact form
3. Submit
4. Check inbox (and spam folder)
5. Should arrive in 1-2 seconds

### ✅ Analytics Works?
1. Open https://sentry.io dashboard
2. Submit form on your site
3. Look for "Form contact: success" event
4. Click to see details

### ✅ Images Optimized?
1. DevTools: F12 → Network
2. Reload page
3. Filter by images
4. Look for `.avif` or `.webp` files
5. Compare sizes (should be ~50% smaller)

---

## Emergency Troubleshooting

### Build Error
```
Solution: Clear cache and reinstall
npm run clean  # or manually: rm -rf node_modules dist
npm install
npm run build
```

### Email Not Sending
```
Check:
1. VITE_EMAIL_PROVIDER is set (resend or sendgrid)
2. VITE_EMAIL_API_KEY is correct
3. VITE_ADMIN_EMAIL exists
4. VITE_ENABLE_EMAIL=true
5. Restart dev server: npm run dev
```

### Server Won't Start
```
Check:
1. Is port 8085 available? lsof -i :8085
2. Kill process: kill -9 <PID>
3. Try different port: npm run dev -- --port 3000
```

### Something Broken?
```
Debug Steps:
1. Clear cache: Ctrl+Shift+Del (browser)
2. Hard refresh: Ctrl+Shift+R
3. Check console: F12 → Console tab
4. Check errors: npm run build 2>&1
5. Google the error message
```

---

## File Locations Quick Ref

```
Components:        src/components/
Pages:             src/pages/
Services:          src/services/           ← NEW (Phase 5)
Custom Hooks:      src/hooks/
Styles:            src/ (inline + CSS)
Tests:             src/test/
Assets:            src/assets/ or public/
Config:            .env.local              ← YOU CREATE THIS
Docs:              Root directory (*.md)
```

---

## Environment Variables Explained

```env
# Email
VITE_EMAIL_PROVIDER=resend          # Which service: resend | sendgrid | backend
VITE_EMAIL_API_KEY=...              # API key from provider
VITE_ADMIN_EMAIL=you@example.com    # Where to send contact notifications
VITE_ENABLE_EMAIL=true              # Turn on/off email feature

# Analytics
VITE_SENTRY_DSN=...                 # Error tracking URL
VITE_APP_VERSION=1.0.0              # Release version for tracking
VITE_ENABLE_ANALYTICS=true          # Turn on/off analytics

# Optional
VITE_GA_ID=...                      # Google Analytics (optional)
VITE_GOOGLE_MAPS_API_KEY=...        # Google Maps (optional)
VITE_BACKEND_URL=...                # If using backend email
```

---

## Performance Checklist

- [ ] Build time < 20s
- [ ] Bundle size < 2 MB
- [ ] Lighthouse score > 80
- [ ] Images load in < 2s
- [ ] Form submit in < 1s
- [ ] Analytics visible in dashboard
- [ ] Mobile responsive works
- [ ] Dark mode toggles

---

## Deployment Steps

1. **Create .env.local** with API keys
2. **Test locally:** `npm run dev`
3. **Build production:** `npm run build`
4. **Test build:** `npm run preview`
5. **Push to GitHub:** `git push origin main`
6. **Deploy to Vercel:**
   - Connect repo at vercel.com
   - Add .env variables in settings
   - Auto-deploys on push!

---

## Visual Status

```
Phase 1 ✅ (Fixes)
Phase 2 ✅ (Dark mode, animations)
Phase 3 ✅ (Forms, carousel)
Phase 4 ✅ (Image optimization)
Phase 5 ✅ (Analytics, Email, Images v2) ← YOU ARE HERE

Next: Phase 6 (Booking system)

Status: 🚀 READY FOR DEPLOYMENT
```

---

## Support Resources

| Need | Link |
|------|------|
| Build breaks? | Run `npm install` then `npm run build` |
| Email not working? | Check API key in `.env.local` |
| Lost? | Read [PHASE5_QUICKSTART.md](PHASE5_QUICKSTART.md) |
| Tech questions? | See [PHASE5_ARCHITECTURE.md](PHASE5_ARCHITECTURE.md) |
| Project history? | See [DEVELOPMENT_JOURNEY.md](DEVELOPMENT_JOURNEY.md) |
| Business overview? | See [STATUS_EXECUTIVO_PT.md](STATUS_EXECUTIVO_PT.md) |
| Sentry docs? | https://docs.sentry.io |
| Resend docs? | https://resend.com/docs |

---

## Success Criteria

✅ Site loads  
✅ No console errors  
✅ Form submits email  
✅ Analytics tracking  
✅ Images optimized  
✅ Mobile works  
✅ Build succeeds  
✅ Ready to deploy  

**All green? You're ready! 🎉**

---

## One More Thing...

The site is **production-ready NOW**. You don't need:
- More development
- More testing  
- More waiting

You just need:
1. API keys (5 min to get)
2. One configuration file (2 min to create)
3. One deployment (5 min to push)

**Total time to live: ~15 minutes.** ⏱️

---

*Last Updated: February 15, 2025*  
*Status: Phase 5 Complete ✅*  
*Next: DEPLOY! 🚀*
