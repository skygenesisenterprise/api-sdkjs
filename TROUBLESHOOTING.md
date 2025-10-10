# 🔧 Dépannage - Publication npm

## Erreur : "You must sign up for private packages"

Cette erreur indique un problème avec la configuration du token npm ou les permissions du compte.

### 🔍 Diagnostic

**Cause la plus probable :** Token npm avec permissions insuffisantes.

### ✅ Solutions

#### 1. Vérifier/Créer le bon token npm

1. **Aller sur** : https://www.npmjs.com/settings/tokens
2. **Créer un nouveau token** avec type :
   - `Automation` (recommandé) OU
   - `Publish` (si Automation ne fonctionne pas)
3. **NE PAS utiliser** : `Read-only` (pas assez de permissions)

#### 2. Mettre à jour le secret GitHub

1. **Aller dans** : Repository Settings → Secrets and variables → Actions
2. **Ajouter/Mettre à jour** : `NPM_TOKEN`
3. **Coller le nouveau token**

#### 3. Tester localement (optionnel)

```bash
# Se connecter avec le token
npm login --registry https://registry.npmjs.org/

# Tester la publication
npm run publish:dry-run

# Si ça marche, le token est bon
```

### 🧪 Test du Workflow

Après avoir mis à jour le token :

1. **Créer un tag de test** :
   ```bash
   npm version prerelease --preid=test
   git push --follow-tags
   ```

2. **Vérifier le workflow GitHub Actions**

3. **Si ça échoue toujours** : Vérifier les logs du workflow

### 🔍 Autres Causes Possibles

#### Token expiré
- Les tokens npm expirent automatiquement
- Vérifier la date d'expiration dans les settings npm

#### Compte npm gratuit
- Les comptes gratuits peuvent avoir des limitations
- Upgrade vers un compte payant si nécessaire

#### Permissions du repository
- S'assurer que le token a accès au package `@skygenesisenterprise/api-sdk`
- Pour les packages scoped, le compte doit être propriétaire de l'organisation

### 📞 Support

Si le problème persiste :

1. **Vérifier les logs** du workflow GitHub Actions
2. **Tester localement** avec `npm publish --dry-run`
3. **Contacter npm support** si nécessaire

### ✅ Vérification Finale

Une fois configuré correctement, vous devriez voir dans les logs :
```
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ @skygenesisenterprise/api-sdk@x.x.x
```

---

**Rappel** : Le token doit avoir les permissions `Automation` ou `Publish` pour fonctionner avec les packages publics.