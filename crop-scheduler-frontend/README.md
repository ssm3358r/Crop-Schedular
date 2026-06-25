# 🌱 FPS Farmer Advisory App

A comprehensive farmer advisory platform developed for **Farm Prosperity Solutions (FPS)** to provide crop-specific guidance, pest and disease management, nutrition recommendations, product information, educational content, and farmer engagement programs.

The application focuses on **Cotton** and **Chilli** crops and helps farmers make informed decisions throughout the crop lifecycle.

---

# 🎯 Project Objective

The goal of the FPS Farmer Advisory App is to:

- Provide stage-wise crop advisory.
- Help farmers identify pests and diseases.
- Recommend FPS products for crop protection and nutrition.
- Deliver educational video content.
- Conduct farmer engagement programs.
- Support offline access in low-connectivity rural areas.

---

# 👥 Users

### Farmers
- Access crop advisory content.
- Watch educational videos.
- View FPS products.
- Register for FPS events.

### FPS Team
- Upload crop advisory content.
- Upload videos and product information.
- Manage events and training programs.

### Admin
- Manage crops, stages, products, videos, and advisory content.

---

# 📱 Mobile Application Flow

## Authentication

```text
Splash Screen
      ↓
Login (Mobile Number)
      ↓
OTP Verification
      ↓
Dashboard
```

---

## Dashboard

```text
Dashboard
│
├── Crop Advisory
├── Learning Center
├── Product Catalog
├── FPS Programmes
└── Profile
```

---

# 🌾 Crop Advisory Module

The Crop Advisory module is the core feature of the application.

```text
Crop Advisory
      ↓
Select Crop
      ↓
Select Growth Stage
      ↓
Select Category
      ↓
View Advisory Content
```

---

## Supported Crops

### Cotton
### Chilli

---

# 🌿 Cotton Advisory

## Growth Stages

1. Early Growth
2. Vegetative Stage
3. Flowering Stage
4. Boll Development Stage
5. Boll Maturity Stage

---

## Cotton Pest Management

### Pests Covered

- Pink Bollworm
- Whitefly
- American Bollworm
- Aphids
- Jassids

Each pest contains:

- What it is
- When it occurs
- Symptoms
- Damage
- Management
- Recommended FPS Products
- Images
- Videos

---

## Cotton Disease Management

### Diseases Covered

- Cotton Leaf Curl Virus
- Root Rot
- Fusarium Wilt
- Alternaria Leaf Spot

Each disease contains:

- What it is
- When it occurs
- Symptoms
- Damage
- Management
- Recommended FPS Products
- Images
- Videos

---

## Cotton Nutrition Management

### Stages

- Seedling & Establishment Stage
- Vegetative Stage
- Flowering Stage
- Boll Development Stage
- Boll Maturity Stage

Each stage contains:

- Nutrient Requirements
- Deficiency Symptoms
- Recommended Dosage
- Application Timing
- FPS Nutrition Recommendations

---

# 🌶️ Chilli Advisory

## Growth Stages

1. Nursery Stage
2. Transplanting Stage
3. Vegetative Stage
4. Flowering Stage
5. Fruit Setting Stage
6. Fruit Development Stage
7. Harvesting Stage

---

## Chilli Pest Management

### Pests Covered

- Thrips
- Mites
- Fruit Borer
- Whitefly

Each pest contains:

- What it is
- When it occurs
- Symptoms
- Damage
- Management
- Recommended FPS Products
- Images
- Videos

---

## Chilli Disease Management

### Diseases Covered

- Anthracnose Fruit Rot
- Damping Off
- Leaf Curl Virus
- Powdery Mildew

Each disease contains:

- What it is
- When it occurs
- Symptoms
- Damage
- Management
- Recommended FPS Products
- Images
- Videos

---

## Chilli Nutrition Management

### Stages

- Nursery Stage
- Transplanting Stage
- Vegetative Stage
- Flowering Stage
- Fruit Setting Stage
- Fruit Development Stage
- Harvesting Stage

Each stage contains:

- Nutrient Requirements
- Deficiency Symptoms
- Application Guidelines
- FPS Product Recommendations

---

# 🎥 Learning Center Module

The Learning Center provides educational content uploaded by FPS experts.

## Features

- Latest Videos
- Crop-wise Videos
- Pest Management Videos
- Disease Management Videos
- Nutrition Management Videos
- Farmer Success Stories
- Seasonal Advisories

### Video Details

- Thumbnail
- Title
- Description
- Duration
- Related Products
- Video Playback

---

# 🧪 Product Catalog Module

The Product Catalog displays FPS agricultural products.

---

## Insecticides

- Neo Super
- Jawa
- Aster
- Avenger
- Calibre
- Proton
- Torpedo
- FPS Tara
- Trident
- Titan
- Narvi
- Samurai
- Spyker
- Liberty
- Vanish
- Nimora

---

## Fungicides

- Omega
- Armet
- Dictator
- Reaper

---

## Nutrition Products

- FPS 11-11-08
- FPS Zinc
- FPS 20-20-20
- FPS Boron
- Maverick
- Matrix
- FPS-CaB
- Prestige
- Apollo
- Guardian Gold
- Nutriva
- Magenta

---

## Product Details

Each product includes:

- Product Name
- Category
- Active Ingredient
- Description
- Dosage
- Application Method
- Target Pest/Disease
- Safety Precautions
- Product Images
- Video Demonstration

---

# 📅 FPS Programmes Module

Farmer engagement and awareness activities.

## Features

- Farmer Meetings
- Training Programs
- Field Demonstrations
- Webinars
- Event Registration

### Event Details

- Event Title
- Date
- Time
- Location
- Description
- Registration Option

---

# 🖥️ Admin Portal

Admin portal developed using Next.js.

## Modules

```text
Admin Dashboard
│
├── Crop Management
├── Stage Management
├── Pest Management
├── Disease Management
├── Nutrition Management
├── Product Management
├── Video Management
├── Event Management
└── User Management
```

---

# 🏗️ Technology Stack

## Mobile Application

- React Native 0.85
- TypeScript
- React Navigation
- Axios
- React Hook Form
- WatermelonDB (Offline SQLite)

---

## Backend

- Django 6.0
- Django REST Framework
- PostgreSQL 15
- PostGIS
- SimpleJWT Authentication
- Cloudinary
- Gunicorn

---

## Admin Portal

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Radix UI
- TanStack Query
- Zustand
- Recharts

---

## Deployment

- Render
- Docker
- PostgreSQL 15 (Render)
- Cloudinary

---

# 🗄️ Core Database Entities

```text
User

Crop

Stage

Category

AdvisoryContent

Product

ProductMapping

Video

Event

Registration
```

---

# 🔄 User Journey Example

```text
Login
   ↓
Dashboard
   ↓
Crop Advisory
   ↓
Cotton
   ↓
Vegetative Stage
   ↓
Pest Management
   ↓
Whitefly
   ↓
Symptoms
Damage
Solution
Recommended FPS Product
   ↓
Watch Related Video
```

---

# 🚀 Future Enhancements

- Push Notifications
- Weather Integration
- AI-based Pest Detection
- Voice Support in Regional Languages
- Multi-language Support
- Offline Content Sync
- Analytics Dashboard

---

# 🌱 FPS Mission

To create a sustainable and profitable agricultural ecosystem by providing farmers with modern crop advisory, quality agricultural inputs, educational resources, and technology-enabled farming solutions.

**Farm Prosperity Solutions Pvt. Ltd.**

*"Bringing the World to the Farmer"*