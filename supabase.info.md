# Supabase Notes

## Get Auth User Raw Meta Data (SQL Query)

### Query

```
SELECT raw_user_meta_data FROM auth.users;
```

### Result

```
[
  {
    "raw_user_meta_data": {
      "iss": "https://accounts.google.com",
      "sub": "100927017240781925217",
      "name": "Chirag Yadav",
      "email": "chiragyadavmangaliya@gmail.com",
      "picture": "https://lh3.googleusercontent.com/a/ACg8ocJNUvl3CagcMnXLwd50N0deFOCBn_3jRUIx1OfRXSDDxXB0GCE8=s96-c",
      "full_name": "Chirag Yadav",
      "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJNUvl3CagcMnXLwd50N0deFOCBn_3jRUIx1OfRXSDDxXB0GCE8=s96-c",
      "provider_id": "100927017240781925217",
      "email_verified": true,
      "phone_verified": false
    }
  },
  {
    "raw_user_meta_data": {
      "iss": "https://api.github.com",
      "sub": "97416399",
      "name": "Chirag Yadav",
      "email": "codechirag123@gmail.com",
      "full_name": "Chirag Yadav",
      "user_name": "chiragyadav2003",
      "avatar_url": "https://avatars.githubusercontent.com/u/97416399?v=4",
      "provider_id": "97416399",
      "email_verified": true,
      "phone_verified": false,
      "preferred_username": "chiragyadav2003"
    }
  }
]
```

## Supabase Function : 'create_user_on_signup'

```
BEGIN   
	INSERT INTO public.profiles
	(id, email, display_name, image_url)   
	VALUES(   
		new.id,   
		new.raw_user_meta_data ->> 'email',   
		COALESCE(new.raw_user_meta_data ->> 'user_name',   
		new.raw_user_meta_data ->> 'full_name'),   
		new.raw_user_meta_data ->> 'avatar_url');   
	return new; 
END;
```

## Supabase TRIGGER : 'create_user_on_signup'

```
CREATE TRIGGER create_user_on_signup 
AFTER INSERT ON auth.users 
FOR EACH ROW 
EXECUTE FUNCTION 
create_user_on_signup ();
```

## Command to generate types :

```
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > 
```

### demo :

```
npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > lib/types/database.types.ts
```
