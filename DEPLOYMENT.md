# 🚀 Deploying "The Commute" to GitHub Pages

This guide will help you make "The Commute" publicly accessible via GitHub Pages.

## Option 1: Deploy from Current Branch (Quickest)

Since the code is already on branch `claude/test-connect-011CUqaZMnmugVpgrVoEuNpY`, you can deploy directly from it:

### Steps:

1. **Go to your GitHub repository**
   ```
   https://github.com/manasvinoronha99/The-curator
   ```

2. **Navigate to Settings**
   - Click on the "Settings" tab (top right of repository)

3. **Find Pages Settings**
   - Scroll down to "Pages" in the left sidebar
   - Or go directly to: `https://github.com/manasvinoronha99/The-curator/settings/pages`

4. **Configure Source**
   - Under "Build and deployment"
   - Source: Select "Deploy from a branch"
   - Branch: Select `claude/test-connect-011CUqaZMnmugVpgrVoEuNpY`
   - Folder: Select `/ (root)`
   - Click "Save"

5. **Wait for Deployment**
   - GitHub will build and deploy your site (takes 1-2 minutes)
   - Refresh the page to see the deployment status

6. **Access Your Site**
   - Your site will be available at:
   ```
   https://manasvinoronha99.github.io/The-curator/
   ```

---

## Option 2: Deploy from Main Branch (Recommended)

For a cleaner URL structure and standard practice, merge to main first:

### Steps:

1. **Create Main Branch** (if it doesn't exist)
   ```bash
   git checkout -b main
   git push origin main
   ```

2. **Create Pull Request**
   - Go to GitHub repository
   - Click "Pull requests" → "New pull request"
   - Base: `main`
   - Compare: `claude/test-connect-011CUqaZMnmugVpgrVoEuNpY`
   - Click "Create pull request"
   - Review and merge

3. **Set Main as Default Branch**
   - Go to Settings → General
   - Under "Default branch", set `main`

4. **Enable GitHub Pages from Main**
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
   - Save

5. **Access Your Site**
   ```
   https://manasvinoronha99.github.io/The-curator/
   ```

---

## Option 3: Create Dedicated gh-pages Branch

This is the traditional GitHub Pages approach:

### Steps:

1. **Create gh-pages branch from your current work**
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **GitHub will automatically detect gh-pages**
   - Go to Settings → Pages
   - It should automatically deploy from `gh-pages`
   - If not, manually select it as the source branch

3. **Your site will be live at:**
   ```
   https://manasvinoronha99.github.io/The-curator/
   ```

---

## 🔧 Troubleshooting

### Site Not Loading?
- Wait 2-3 minutes after enabling Pages
- Check that `index.html` is in the root directory
- Verify the branch you selected exists and has the files

### 404 Error?
- Ensure the repository is public (Settings → General → Danger Zone)
- Check that GitHub Pages is enabled
- Verify the correct branch is selected

### Images or Assets Not Loading?
- All file paths should be relative (no leading `/`)
- Check browser console for errors
- Ensure all files are committed and pushed

---

## 📱 Sharing Your Project

Once deployed, share your interactive narrative:

**Direct Link:**
```
https://manasvinoronha99.github.io/The-curator/
```

**Social Media Description:**
> Experience "The Commute" - an interactive narrative about connection and isolation on a late-night train. Every choice matters. 🚊✨

**For Embedding:**
```html
<iframe src="https://manasvinoronha99.github.io/The-curator/"
        width="100%"
        height="800px"
        frameborder="0">
</iframe>
```

---

## 🎯 Custom Domain (Optional)

Want a custom domain like `thecommute.com`?

1. **Buy a domain** (Namecheap, Google Domains, etc.)

2. **Configure DNS**
   - Add these DNS records at your domain registrar:
   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   CNAME www.yourdomain.com → manasvinoronha99.github.io
   ```

3. **Add Custom Domain in GitHub**
   - Settings → Pages
   - Custom domain: `yourdomain.com`
   - Save
   - Check "Enforce HTTPS" (after DNS propagates)

4. **Create CNAME file** in your repository root:
   ```
   yourdomain.com
   ```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads at GitHub Pages URL
- [ ] All interactive elements work (gaze buttons, choices)
- [ ] Audio toggles properly
- [ ] Choices lead to new scenes
- [ ] Endings display correctly
- [ ] Mobile responsive design works
- [ ] No console errors in browser

---

## 🔄 Updating Your Site

After making changes:

```bash
# Make your edits
git add .
git commit -m "Update: description of changes"
git push origin [your-branch-name]
```

GitHub Pages will automatically rebuild (takes 1-2 minutes).

---

## 📊 Analytics (Optional)

Track visitors with Google Analytics:

1. Get a Google Analytics tracking ID
2. Add to your `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎉 You're Done!

Your interactive narrative is now live and accessible to anyone in the world!

**Quick Links:**
- 🌐 Live Site: `https://manasvinoronha99.github.io/The-curator/`
- 📂 Repository: `https://github.com/manasvinoronha99/The-curator`
- ⚙️ Pages Settings: `https://github.com/manasvinoronha99/The-curator/settings/pages`

**Share it:**
- Twitter/X: Share with #InteractiveNarrative #WebDesign #CreativeCoding
- Reddit: r/InteractiveFiction, r/webdev
- LinkedIn: Showcase your project
- Portfolio: Add it as a featured project

---

Need help? Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in the repository.
