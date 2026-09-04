const User = require('../models/User');
const Category = require('../models/Category');
const Test = require('../models/Test');
const Package = require('../models/Package');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const WebsiteSetting = require('../models/WebsiteSetting');

const defaultSettings = [
    { key: 'businessName', value: 'विमला जाँच घर', group: 'business', label: 'Business Name' },
    { key: 'businessNameEn', value: 'Vimla Janch Ghar', group: 'business', label: 'Business Name (English)' },
    { key: 'tagline', value: 'Reliable Diagnostics. Trusted Care.', group: 'business', label: 'Tagline' },
    { key: 'phone', value: '+91 93419 32548', group: 'contact', label: 'Phone' },
    { key: 'whatsapp', value: '919341932548', group: 'contact', label: 'WhatsApp Number' },
    { key: 'email', value: 'info@vimlajanch.com', group: 'contact', label: 'Email' },
    { key: 'address', value: 'Dasrath Chowk, Vidhan Bazar, Samastipur, Bihar', group: 'contact', label: 'Address' },
    { key: 'city', value: 'Samastipur', group: 'contact', label: 'City' },
    { key: 'openingHours', value: 'Mon–Sat: 7:00 AM – 8:00 PM | Sun: 8:00 AM – 2:00 PM', group: 'contact', label: 'Opening Hours' },
    { key: 'googleMapsUrl', value: 'https://maps.google.com/?q=Dasrath+Chowk+Vidhan+Bazar+Samastipur', group: 'contact', label: 'Google Maps URL' },
    { key: 'homeCollection', value: false, group: 'features', label: 'Home Sample Collection Enabled', type: 'boolean' },
    { key: 'showPrices', value: true, group: 'features', label: 'Show Test Prices', type: 'boolean' },
    { key: 'aboutText', value: 'विमला जाँच घर is a local diagnostic and pathology testing centre located at Dasrath Chowk, Vidhan Bazar, Samastipur. Managed by Azad Kumar Raman, a B.Sc. M.L.T (Path) qualified professional with experience at Dr. B.R. Ambedkar Institute of Punjab. Our focus is on proper sample handling, hygienic procedures and timely reporting to support your healthcare needs.', group: 'content', label: 'About Text' },
    { key: 'disclaimer', value: 'Information provided on this website is for general informational purposes only and should not be considered medical advice or a diagnosis. Test selection and interpretation should be discussed with a qualified healthcare professional. Laboratory services and test availability are subject to the laboratory\'s actual capabilities and applicable requirements.', group: 'content', label: 'Medical Disclaimer' },
    { key: 'metaDescription', value: 'विमला जाँच घर (Vimla Janch Ghar) — Pathology laboratory at Dasrath Chowk, Vidhan Bazar, Samastipur. CBC, thyroid, liver, kidney, lipid profile, urine tests and more.', group: 'seo', label: 'Meta Description' },
];

const categories = [
    { name: 'Hematology', slug: 'hematology', description: 'Blood cell count and related investigations', icon: 'droplets', color: '#dc2626', order: 1 },
    { name: 'Clinical Biochemistry', slug: 'biochemistry', description: 'Blood chemistry, sugar, liver, kidney and lipid investigations', icon: 'flask-conical', color: '#d97706', order: 2 },
    { name: 'Thyroid', slug: 'thyroid', description: 'Thyroid function tests including T3, T4, TSH', icon: 'activity', color: '#7c3aed', order: 3 },
    { name: 'Clinical Pathology', slug: 'clinical-pathology', description: 'Urine, stool and other routine examinations', icon: 'microscope', color: '#0891b2', order: 4 },
    { name: 'Serology & Immunology', slug: 'serology', description: 'Infection and immune response markers', icon: 'shield-check', color: '#16a34a', order: 5 },
    { name: 'Vitamins & Nutrition', slug: 'vitamins-nutrition', description: 'Vitamin and mineral level assessments', icon: 'sun', color: '#ca8a04', order: 6 },
    { name: 'Diabetes Monitoring', slug: 'diabetes', description: 'Blood sugar and diabetes management tests', icon: 'trending-up', color: '#ea580c', order: 7 },
];

async function seedIfEmpty() {
    try {
        // Seed admin user
        const adminExists = await User.findOne({ email: 'admin@vimlajanch.com' });
        if (!adminExists) {
            await User.create({ name: 'Admin', email: 'admin@vimlajanch.com', password: 'admin@123', role: 'admin' });
            console.log('✅ Admin user created: admin@vimlajanch.com / admin@123');
        }

        // Seed settings
        const settingsCount = await WebsiteSetting.countDocuments();
        if (settingsCount === 0) {
            await WebsiteSetting.insertMany(defaultSettings);
            console.log('✅ Default settings seeded');
        }

        // Seed categories
        const catCount = await Category.countDocuments();
        if (catCount === 0) {
            const createdCats = await Category.insertMany(categories);
            console.log('✅ Categories seeded');

            // Map category names to IDs
            const catMap = {};
            createdCats.forEach(c => { catMap[c.slug] = c._id; });

            const tests = [
                // Hematology
                { name: 'Complete Blood Count (CBC)', slug: 'cbc', category: catMap['hematology'], shortDescription: 'Comprehensive evaluation of blood cells including RBC, WBC and platelet counts.', description: 'Complete Blood Count (CBC) is a commonly performed blood test that evaluates several blood-cell parameters including the types, numbers, and conditions of cells in your blood. It provides important information about the kinds and numbers of cells in the blood.', sampleType: 'Blood (EDTA)', preparation: 'No special preparation required. Inform the doctor about any medications.', reportTime: 'Same Day (4–6 hours)', price: 200, isPopular: true, isAvailable: true, parameters: [{ name: 'Hemoglobin (Hb)', unit: 'g/dL' }, { name: 'RBC Count', unit: 'million/µL' }, { name: 'WBC Count', unit: 'cells/µL' }, { name: 'Platelet Count', unit: 'lakh/µL' }, { name: 'Hematocrit (PCV)', unit: '%' }, { name: 'MCV', unit: 'fL' }, { name: 'MCH', unit: 'pg' }, { name: 'MCHC', unit: 'g/dL' }, { name: 'RDW', unit: '%' }, { name: 'Differential Leukocyte Count', unit: '%' }], tags: ['cbc', 'blood count', 'hemoglobin', 'complete blood count'] },
                { name: 'Hemoglobin (Hb)', slug: 'hemoglobin', category: catMap['hematology'], shortDescription: 'Measures the amount of hemoglobin in blood.', description: 'Hemoglobin test measures the level of hemoglobin in the blood. Hemoglobin is the protein in red blood cells that carries oxygen. This test helps evaluate anemia and related conditions.', sampleType: 'Blood (EDTA)', preparation: 'No special preparation required.', reportTime: 'Same Day (2–4 hours)', price: 80, isPopular: false, isAvailable: true, parameters: [{ name: 'Hemoglobin', unit: 'g/dL' }], tags: ['hemoglobin', 'hb', 'anemia'] },
                { name: 'ESR (Erythrocyte Sedimentation Rate)', slug: 'esr', category: catMap['hematology'], shortDescription: 'A blood test that can reveal inflammatory activity in the body.', description: 'ESR measures how quickly red blood cells settle at the bottom of a tube. An elevated ESR may indicate the presence of inflammation, though it is not specific to any one disease.', sampleType: 'Blood (EDTA)', preparation: 'No special preparation required.', reportTime: 'Same Day (2 hours)', price: 80, isAvailable: true, parameters: [{ name: 'ESR', unit: 'mm/hr' }], tags: ['esr', 'inflammation', 'sedimentation'] },
                { name: 'Blood Group & Rh Typing', slug: 'blood-group', category: catMap['hematology'], shortDescription: 'Determines ABO blood group and Rh factor.', description: 'This test determines your blood type (A, B, AB, or O) and Rh factor (positive or negative). This information is important for blood transfusions, organ transplants, and pregnancy management.', sampleType: 'Blood', preparation: 'No special preparation required.', reportTime: 'Same Day (2–3 hours)', price: 100, isAvailable: true, parameters: [{ name: 'ABO Blood Group' }, { name: 'Rh Factor' }], tags: ['blood group', 'rh factor', 'blood type'] },
                { name: 'Peripheral Blood Smear', slug: 'peripheral-smear', category: catMap['hematology'], shortDescription: 'Microscopic examination of blood cells.', description: 'A peripheral blood smear involves examining a thin layer of blood under a microscope to assess blood cell morphology and identify abnormalities in red cells, white cells, and platelets.', sampleType: 'Blood (EDTA)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 150, isAvailable: true, parameters: [{ name: 'RBC Morphology' }, { name: 'WBC Morphology' }, { name: 'Platelet Morphology' }], tags: ['peripheral smear', 'blood smear'] },

                // Biochemistry
                { name: 'Fasting Blood Sugar (FBS)', slug: 'fbs', category: catMap['biochemistry'], shortDescription: 'Blood glucose test after an overnight fast.', description: 'Fasting Blood Sugar measures the concentration of glucose in the blood after a period of fasting (typically 8–12 hours). It is commonly used in the evaluation and monitoring of blood sugar levels.', sampleType: 'Blood (Serum)', preparation: 'Fast for 8–12 hours before the test. Water is permitted.', reportTime: 'Same Day (2–4 hours)', price: 80, isPopular: true, isAvailable: true, parameters: [{ name: 'Glucose (Fasting)', unit: 'mg/dL' }], tags: ['fasting blood sugar', 'fbs', 'glucose', 'diabetes', 'sugar'] },
                { name: 'Post Prandial Blood Sugar (PPBS)', slug: 'ppbs', category: catMap['biochemistry'], shortDescription: 'Blood glucose test 2 hours after a meal.', description: 'Post Prandial Blood Sugar measures blood glucose 2 hours after consuming a meal. It helps assess how well the body manages blood sugar after eating.', sampleType: 'Blood (Serum)', preparation: 'Blood drawn 2 hours after the start of a meal.', reportTime: 'Same Day (2–4 hours)', price: 80, isAvailable: true, parameters: [{ name: 'Glucose (Post Prandial)', unit: 'mg/dL' }], tags: ['ppbs', 'post prandial', 'blood sugar', 'glucose'] },
                { name: 'Random Blood Sugar (RBS)', slug: 'rbs', category: catMap['biochemistry'], shortDescription: 'Blood glucose measurement at any time of day.', description: 'Random Blood Sugar measures blood glucose at a random time regardless of when you last ate. It can be used for initial screening and monitoring.', sampleType: 'Blood (Serum)', preparation: 'No fasting required.', reportTime: 'Same Day (1–2 hours)', price: 60, isAvailable: true, parameters: [{ name: 'Glucose (Random)', unit: 'mg/dL' }], tags: ['random blood sugar', 'rbs', 'glucose'] },
                { name: 'HbA1c (Glycated Hemoglobin)', slug: 'hba1c', category: catMap['biochemistry'], shortDescription: 'Measures average blood glucose over the past 2–3 months.', description: 'HbA1c provides an average of your blood sugar levels over the past 2–3 months. It is commonly used in the management of blood sugar monitoring over time.', sampleType: 'Blood (EDTA)', preparation: 'No special fasting required.', reportTime: 'Same Day (4–6 hours)', price: 350, isPopular: true, isAvailable: true, parameters: [{ name: 'HbA1c', unit: '%' }, { name: 'Estimated Average Glucose', unit: 'mg/dL' }], tags: ['hba1c', 'glycated hemoglobin', 'diabetes', 'average blood sugar'] },
                { name: 'Liver Function Tests (LFT)', slug: 'lft', category: catMap['biochemistry'], shortDescription: 'Comprehensive panel to evaluate liver health.', description: 'Liver Function Tests (LFT) is a group of blood tests that measure various enzymes and proteins in the blood to assess liver health and function.', sampleType: 'Blood (Serum)', preparation: 'Preferably fast for 8 hours before the test.', reportTime: 'Same Day (4–6 hours)', price: 450, isPopular: true, isAvailable: true, parameters: [{ name: 'Total Bilirubin', unit: 'mg/dL' }, { name: 'Direct Bilirubin', unit: 'mg/dL' }, { name: 'Indirect Bilirubin', unit: 'mg/dL' }, { name: 'AST/SGOT', unit: 'U/L' }, { name: 'ALT/SGPT', unit: 'U/L' }, { name: 'Alkaline Phosphatase (ALP)', unit: 'U/L' }, { name: 'Total Protein', unit: 'g/dL' }, { name: 'Albumin', unit: 'g/dL' }, { name: 'Globulin', unit: 'g/dL' }], tags: ['lft', 'liver function', 'bilirubin', 'sgot', 'sgpt', 'liver test'] },
                { name: 'Kidney Function Tests (KFT / RFT)', slug: 'kft', category: catMap['biochemistry'], shortDescription: 'Evaluates kidney health through key blood markers.', description: 'Kidney Function Tests (KFT) assess how well the kidneys are filtering waste from the blood. The panel includes markers like urea, creatinine, and uric acid.', sampleType: 'Blood (Serum)', preparation: 'Preferably fast for 8 hours before the test.', reportTime: 'Same Day (4–6 hours)', price: 400, isPopular: true, isAvailable: true, parameters: [{ name: 'Blood Urea', unit: 'mg/dL' }, { name: 'Serum Creatinine', unit: 'mg/dL' }, { name: 'Uric Acid', unit: 'mg/dL' }, { name: 'BUN (Blood Urea Nitrogen)', unit: 'mg/dL' }, { name: 'Calcium', unit: 'mg/dL' }], tags: ['kft', 'kidney function', 'renal', 'creatinine', 'urea', 'kidney test'] },
                { name: 'Lipid Profile', slug: 'lipid-profile', category: catMap['biochemistry'], shortDescription: 'Measures cholesterol and related fats in the blood.', description: 'A lipid profile is a blood test that measures the levels of cholesterol and triglycerides in the blood. Results help assess cardiovascular risk factors.', sampleType: 'Blood (Serum)', preparation: 'Fast for 10–12 hours before the test. Water is permitted.', reportTime: 'Same Day (4–6 hours)', price: 400, isPopular: true, isAvailable: true, parameters: [{ name: 'Total Cholesterol', unit: 'mg/dL' }, { name: 'Triglycerides', unit: 'mg/dL' }, { name: 'HDL Cholesterol', unit: 'mg/dL' }, { name: 'LDL Cholesterol', unit: 'mg/dL' }, { name: 'VLDL Cholesterol', unit: 'mg/dL' }, { name: 'Total Cholesterol/HDL Ratio' }], tags: ['lipid profile', 'cholesterol', 'triglycerides', 'hdl', 'ldl'] },
                { name: 'Urea', slug: 'urea', category: catMap['biochemistry'], shortDescription: 'Measures blood urea nitrogen as a kidney function marker.', description: 'Blood urea is a marker used to evaluate kidney function. Elevated levels may indicate reduced kidney efficiency.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 80, isAvailable: true, parameters: [{ name: 'Blood Urea', unit: 'mg/dL' }], tags: ['urea', 'bun', 'kidney'] },
                { name: 'Serum Creatinine', slug: 'creatinine', category: catMap['biochemistry'], shortDescription: 'Key marker for kidney function.', description: 'Serum creatinine is a waste product produced by muscle metabolism and is filtered by the kidneys. Elevated creatinine levels can indicate reduced kidney function.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 80, isAvailable: true, parameters: [{ name: 'Creatinine', unit: 'mg/dL' }], tags: ['creatinine', 'kidney'] },

                // Thyroid
                { name: 'Thyroid Profile (T3, T4, TSH)', slug: 'thyroid-profile', category: catMap['thyroid'], shortDescription: 'Complete thyroid function assessment with T3, T4 and TSH.', description: 'Thyroid Profile measures T3, T4 and TSH to assess thyroid gland function. This panel helps in evaluating both underactive (hypothyroid) and overactive (hyperthyroid) conditions as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required. Preferably collect in morning.', reportTime: 'Same Day (4–6 hours)', price: 550, isPopular: true, isAvailable: true, parameters: [{ name: 'T3 (Triiodothyronine)', unit: 'ng/dL' }, { name: 'T4 (Thyroxine)', unit: 'µg/dL' }, { name: 'TSH (Thyroid Stimulating Hormone)', unit: 'µIU/mL' }], tags: ['thyroid', 't3', 't4', 'tsh', 'thyroid profile'] },
                { name: 'TSH (Thyroid Stimulating Hormone)', slug: 'tsh', category: catMap['thyroid'], shortDescription: 'Measures TSH levels to screen for thyroid conditions.', description: 'TSH is often the first test used to evaluate thyroid function. It is secreted by the pituitary gland and regulates thyroid hormone production.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day (3–5 hours)', price: 250, isPopular: false, isAvailable: true, parameters: [{ name: 'TSH', unit: 'µIU/mL' }], tags: ['tsh', 'thyroid'] },
                { name: 'Free T3 (FT3)', slug: 'ft3', category: catMap['thyroid'], shortDescription: 'Measures free triiodothyronine levels.', description: 'Free T3 measures the unbound, active form of triiodothyronine in the blood. It is used alongside other thyroid tests as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'Free T3', unit: 'pg/mL' }], tags: ['ft3', 'free t3', 'thyroid'] },
                { name: 'Free T4 (FT4)', slug: 'ft4', category: catMap['thyroid'], shortDescription: 'Measures free thyroxine levels.', description: 'Free T4 measures the unbound, active form of thyroxine. It is evaluated alongside TSH as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'Free T4', unit: 'ng/dL' }], tags: ['ft4', 'free t4', 'thyroid'] },

                // Clinical Pathology
                { name: 'Urine Routine & Microscopy', slug: 'urine-routine', category: catMap['clinical-pathology'], shortDescription: 'Comprehensive examination of urine including physical, chemical and microscopic analysis.', description: 'Urine Routine & Microscopy is a basic diagnostic test that examines the physical, chemical, and microscopic properties of urine. It provides useful information about kidney and urinary tract health.', sampleType: 'Urine (Mid-stream)', preparation: 'Collect mid-stream urine (preferably morning sample) in a clean, dry container.', reportTime: 'Same Day (2–4 hours)', price: 120, isPopular: true, isAvailable: true, parameters: [{ name: 'Color & Appearance' }, { name: 'Specific Gravity' }, { name: 'pH' }, { name: 'Protein' }, { name: 'Glucose' }, { name: 'Ketones' }, { name: 'Blood' }, { name: 'Bilirubin' }, { name: 'Nitrites' }, { name: 'Microscopy (Cells, Casts, Crystals)' }], tags: ['urine routine', 'urine test', 'urinalysis', 'urine microscopy'] },
                { name: 'Urine Sugar', slug: 'urine-sugar', category: catMap['clinical-pathology'], shortDescription: 'Detects glucose in urine.', description: 'Urine Sugar test detects the presence and approximate amount of glucose in urine. Glucose in urine can be an indicator warranting further investigation as advised by a physician.', sampleType: 'Urine', preparation: 'Random or first morning urine sample.', reportTime: 'Same Day', price: 40, isAvailable: true, parameters: [{ name: 'Urine Glucose' }], tags: ['urine sugar', 'glucose urine'] },
                { name: 'Urine Protein', slug: 'urine-protein', category: catMap['clinical-pathology'], shortDescription: 'Detects protein in urine.', description: 'This test detects protein in the urine. The presence of protein in urine may warrant further evaluation as directed by a physician.', sampleType: 'Urine', preparation: 'Random or first morning urine sample.', reportTime: 'Same Day', price: 40, isAvailable: true, parameters: [{ name: 'Urine Protein' }], tags: ['urine protein', 'proteinuria'] },
                { name: 'Stool Routine Examination', slug: 'stool-routine', category: catMap['clinical-pathology'], shortDescription: 'Microscopic examination of stool sample.', description: 'Stool Routine Examination is a microscopic test that examines a stool sample for the presence of blood, bacteria, parasites, and other abnormalities.', sampleType: 'Stool', preparation: 'Collect a small amount of fresh stool in a clean container. Avoid contamination with urine.', reportTime: 'Same Day', price: 100, isAvailable: true, parameters: [{ name: 'Consistency & Color' }, { name: 'Blood / Mucus' }, { name: 'Ova & Parasites' }, { name: 'Pus Cells' }], tags: ['stool', 'stool test', 'stool examination'] },

                // Serology
                { name: 'CRP (C-Reactive Protein)', slug: 'crp', category: catMap['serology'], shortDescription: 'Marker of inflammation and infection.', description: 'CRP is a protein produced by the liver in response to inflammation. Elevated levels indicate the presence of inflammation or infection and are evaluated in the context of clinical symptoms.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'CRP', unit: 'mg/L' }], tags: ['crp', 'inflammation', 'infection'] },
                { name: 'HBsAg (Hepatitis B Surface Antigen)', slug: 'hbsag', category: catMap['serology'], shortDescription: 'Screening test for Hepatitis B infection.', description: 'HBsAg is a screening test for Hepatitis B virus infection. A positive result requires further evaluation by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'HBsAg (Qualitative)' }], tags: ['hbsag', 'hepatitis b', 'liver'] },
                { name: 'Widal Test', slug: 'widal', category: catMap['serology'], shortDescription: 'Serological test in the evaluation of enteric fever.', description: 'Widal test is a serological test used in the evaluation of typhoid and paratyphoid fever. Results should be interpreted by a physician in the context of clinical symptoms and history.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 150, isAvailable: true, parameters: [{ name: 'S. Typhi O' }, { name: 'S. Typhi H' }, { name: 'S. Paratyphi AO' }, { name: 'S. Paratyphi AH' }], tags: ['widal', 'typhoid', 'enteric fever'] },
                { name: 'Dengue NS1 Antigen', slug: 'dengue-ns1', category: catMap['serology'], shortDescription: 'Early detection marker for Dengue fever.', description: 'Dengue NS1 Antigen test is used for early detection of dengue virus infection. It is most useful in the first few days of fever. Results should be interpreted by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 500, isAvailable: true, parameters: [{ name: 'NS1 Antigen (Qualitative)' }], tags: ['dengue', 'ns1', 'fever'] },
                { name: 'Malaria Parasite (MP) Test', slug: 'malaria-mp', category: catMap['serology'], shortDescription: 'Rapid detection of malaria parasites.', description: 'Malaria Parasite test detects the presence of malaria parasites in the blood. Results should be interpreted by a physician.', sampleType: 'Blood', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 150, isAvailable: true, parameters: [{ name: 'Plasmodium species' }], tags: ['malaria', 'mp test', 'fever'] },
                { name: 'RA Factor (Rheumatoid Factor)', slug: 'ra-factor', category: catMap['serology'], shortDescription: 'Blood test used in the evaluation of rheumatoid arthritis.', description: 'RA Factor test detects rheumatoid factor in the blood. It is used as part of the evaluation for rheumatoid arthritis as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'RA Factor' }], tags: ['ra factor', 'rheumatoid', 'arthritis'] },

                // Vitamins & Nutrition
                { name: 'Vitamin B12', slug: 'vitamin-b12', category: catMap['vitamins-nutrition'], shortDescription: 'Measures Vitamin B12 levels in the blood.', description: 'Vitamin B12 test measures the amount of Vitamin B12 in the blood. Vitamin B12 is essential for nerve function and red blood cell production. Low levels may require evaluation by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required. Morning sample preferred.', reportTime: 'Same Day (4–6 hours)', price: 600, isPopular: false, isAvailable: true, parameters: [{ name: 'Vitamin B12', unit: 'pg/mL' }], tags: ['vitamin b12', 'b12', 'cobalamin'] },
                { name: 'Vitamin D (25-OH)', slug: 'vitamin-d', category: catMap['vitamins-nutrition'], shortDescription: 'Measures Vitamin D3 levels.', description: 'Vitamin D test measures the level of 25-hydroxyvitamin D in the blood. Vitamin D is important for bone health and immune function. Deficiency is common and should be evaluated by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day (4–6 hours)', price: 800, isPopular: false, isAvailable: true, parameters: [{ name: 'Vitamin D (25-OH)', unit: 'ng/mL' }], tags: ['vitamin d', 'vitamin d3', '25-oh'] },
                { name: 'Serum Iron', slug: 'serum-iron', category: catMap['vitamins-nutrition'], shortDescription: 'Measures iron levels in the blood.', description: 'Serum Iron test measures the amount of iron in the blood. It is used in the evaluation of anemia and iron deficiency as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'Fast for 8–12 hours. Morning sample preferred.', reportTime: 'Same Day', price: 200, isAvailable: true, parameters: [{ name: 'Serum Iron', unit: 'µg/dL' }], tags: ['iron', 'serum iron', 'anemia'] },
                { name: 'Serum Ferritin', slug: 'ferritin', category: catMap['vitamins-nutrition'], shortDescription: 'Measures stored iron levels.', description: 'Serum Ferritin measures the stored form of iron in the body. It helps evaluate iron stores and is used in the assessment of anemia and iron-related conditions as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'No special preparation required.', reportTime: 'Same Day', price: 500, isAvailable: true, parameters: [{ name: 'Ferritin', unit: 'ng/mL' }], tags: ['ferritin', 'iron stores', 'anemia'] },

                // Diabetes
                { name: 'Glucose Tolerance Test (GTT)', slug: 'gtt', category: catMap['diabetes'], shortDescription: 'Evaluates how the body processes glucose over time.', description: 'Glucose Tolerance Test involves measuring blood glucose at intervals after consuming a glucose solution. It is used in the evaluation of glucose metabolism as directed by a physician.', sampleType: 'Blood (Serum)', preparation: 'Fast for 8–12 hours. Three to four blood samples are collected at intervals.', reportTime: 'Same Day', price: 250, isAvailable: true, parameters: [{ name: 'Fasting Glucose', unit: 'mg/dL' }, { name: '1-hour Glucose', unit: 'mg/dL' }, { name: '2-hour Glucose', unit: 'mg/dL' }], tags: ['gtt', 'glucose tolerance', 'ogtt', 'diabetes'] },
                { name: 'Urine Microalbumin', slug: 'microalbumin', category: catMap['diabetes'], shortDescription: 'Detects small amounts of albumin in urine for early kidney evaluation.', description: 'Urine Microalbumin test detects small amounts of the protein albumin in urine. It is used in the monitoring of kidney health in people with diabetes as directed by a physician.', sampleType: 'Urine (Spot)', preparation: 'Collect first morning urine sample in a clean container.', reportTime: 'Same Day', price: 300, isAvailable: true, parameters: [{ name: 'Microalbumin', unit: 'mg/L' }], tags: ['microalbumin', 'albumin urine', 'kidney', 'diabetes'] },
            ];

            const createdTests = await Test.insertMany(tests);
            console.log(`✅ ${createdTests.length} tests seeded`);

            // Seed packages
            const testMap = {};
            createdTests.forEach(t => { testMap[t.slug] = t._id; });

            const packages = [
                {
                    name: 'Basic Health Check',
                    slug: 'basic-health-check',
                    shortDescription: 'An essential starting-point check covering key blood and urine parameters.',
                    description: 'This package includes commonly requested routine investigations to provide a general overview of health parameters. Individual tests and reference ranges should be discussed with your doctor.',
                    testNames: ['Complete Blood Count (CBC)', 'Fasting Blood Sugar', 'Lipid Profile', 'Liver Function Tests (LFT)', 'Kidney Function Tests (KFT)', 'Urine Routine & Microscopy'],
                    tests: ['cbc', 'fbs', 'lipid-profile', 'lft', 'kft', 'urine-routine'].map(s => testMap[s]).filter(Boolean),
                    price: 1200,
                    showPrice: true,
                    isActive: true,
                    isPopular: true,
                    color: '#1e40af',
                    disclaimer: 'This package is not a substitute for a medical consultation. Please consult your doctor for interpretation of results.',
                    order: 1,
                },
                {
                    name: 'Diabetes Screening Panel',
                    slug: 'diabetes-screening',
                    shortDescription: 'Key investigations commonly requested in the context of blood sugar monitoring.',
                    description: 'This panel includes commonly requested investigations related to blood sugar monitoring. Interpretation of results should be done by a qualified healthcare professional.',
                    testNames: ['Fasting Blood Sugar (FBS)', 'HbA1c', 'Post Prandial Blood Sugar', 'Lipid Profile', 'Kidney Function Tests (KFT)', 'Urine Routine & Microscopy'],
                    tests: ['fbs', 'hba1c', 'ppbs', 'lipid-profile', 'kft', 'urine-routine'].map(s => testMap[s]).filter(Boolean),
                    price: 1100,
                    showPrice: true,
                    isActive: true,
                    isPopular: true,
                    color: '#ea580c',
                    disclaimer: 'Test results should be interpreted by a qualified healthcare professional.',
                    order: 2,
                },
                {
                    name: 'Thyroid Health Panel',
                    slug: 'thyroid-health',
                    shortDescription: 'A focused panel for thyroid function assessment.',
                    description: 'Includes complete thyroid function tests as well as supporting blood parameters. Physician consultation recommended for result interpretation.',
                    testNames: ['Thyroid Profile (T3, T4, TSH)', 'Complete Blood Count (CBC)', 'Fasting Blood Sugar'],
                    tests: ['thyroid-profile', 'cbc', 'fbs'].map(s => testMap[s]).filter(Boolean),
                    price: 900,
                    showPrice: true,
                    isActive: true,
                    isPopular: false,
                    color: '#7c3aed',
                    disclaimer: 'Test results should be interpreted in consultation with a healthcare professional.',
                    order: 3,
                },
                {
                    name: 'Women\'s Wellness Panel',
                    slug: 'womens-wellness',
                    shortDescription: 'Selected investigations commonly requested for women\'s routine health monitoring.',
                    description: 'This panel includes tests commonly requested as part of routine health monitoring for women. Results should be discussed with a qualified healthcare professional.',
                    testNames: ['Complete Blood Count (CBC)', 'Thyroid Profile (T3, T4, TSH)', 'Vitamin B12', 'Vitamin D', 'Serum Iron', 'Fasting Blood Sugar', 'Urine Routine & Microscopy'],
                    tests: ['cbc', 'thyroid-profile', 'vitamin-b12', 'vitamin-d', 'serum-iron', 'fbs', 'urine-routine'].map(s => testMap[s]).filter(Boolean),
                    price: 2200,
                    showPrice: true,
                    isActive: true,
                    isPopular: false,
                    color: '#db2777',
                    disclaimer: 'This panel is for informational purposes. Please consult your doctor for medical advice.',
                    order: 4,
                },
                {
                    name: 'Fever Investigation Panel',
                    slug: 'fever-panel',
                    shortDescription: 'Common investigations requested during fever evaluation.',
                    description: 'This panel covers commonly requested tests in the evaluation of fever. A physician should evaluate the results in the context of clinical symptoms.',
                    testNames: ['Complete Blood Count (CBC)', 'ESR', 'Widal Test', 'Dengue NS1 Antigen', 'Malaria Parasite Test', 'CRP'],
                    tests: ['cbc', 'esr', 'widal', 'dengue-ns1', 'malaria-mp', 'crp'].map(s => testMap[s]).filter(Boolean),
                    price: 1100,
                    showPrice: true,
                    isActive: true,
                    isPopular: false,
                    color: '#dc2626',
                    disclaimer: 'Results should be evaluated by a physician. Clinical correlation is necessary.',
                    order: 5,
                },
            ];

            await Package.insertMany(packages);
            console.log('✅ Packages seeded');
        }

        // Seed FAQs
        const faqCount = await FAQ.countDocuments();
        if (faqCount === 0) {
            await FAQ.insertMany([
                { question: 'Do I need to fast before a blood test?', answer: 'Fasting requirements vary depending on the test. Tests like Fasting Blood Sugar, Lipid Profile, and Kidney Function Tests typically require 8–12 hours of fasting. Tests like CBC, thyroid tests, and random blood sugar generally do not require fasting. Please check the preparation instructions for your specific test or ask our staff.', order: 1 },
                { question: 'How long does it take to get results?', answer: 'Most routine tests such as CBC, blood sugar, and urine routine are reported the same day, typically within 2–6 hours. Some specialized tests may take longer. Estimated report times are mentioned on each test page.', order: 2 },
                { question: 'How can I request a test or enquire about a test?', answer: 'You can contact us by phone, WhatsApp, or by filling the enquiry form on this website. Our staff will guide you on the next steps.', order: 3 },
                { question: 'Can I contact विमला जाँच घर on WhatsApp?', answer: 'Yes. You can reach us directly on WhatsApp using the WhatsApp button on this website. Our staff will respond during working hours.', order: 4 },
                { question: 'Do you provide home sample collection?', answer: 'Please contact us directly to confirm the current availability of home sample collection service in your area.', order: 5 },
                { question: 'How do I receive my report?', answer: 'Reports can be collected from the laboratory. For information about digital or WhatsApp report delivery, please contact our staff directly.', order: 6 },
                { question: 'What should I bring when visiting the laboratory?', answer: 'Please bring your doctor\'s prescription or test request, a valid ID, and any prior reports if relevant. If fasting is required for your test, ensure you have fasted for the required duration.', order: 7 },
                { question: 'Are the test prices fixed?', answer: 'Test prices are subject to change. Please contact us directly for the latest pricing information.', order: 8 },
            ]);
            console.log('✅ FAQs seeded');
        }

        // Seed sample testimonials (admin must approve before they appear publicly)
        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            await Testimonial.insertMany([
                { name: 'Ramesh Kumar', location: 'Local Resident', review: 'Very professional service. Reports were ready on time and the staff was helpful in explaining the process.', rating: 5, isApproved: true, order: 1 },
                { name: 'Sunita Devi', location: 'Local Resident', review: 'Clean and hygienic facility. I appreciated that the sample collection was done carefully and professionally.', rating: 5, isApproved: true, order: 2 },
                { name: 'Amit Sharma', location: 'Local Resident', review: 'Good experience overall. Timely reporting and cooperative staff.', rating: 4, isApproved: true, order: 3 },
            ]);
            console.log('✅ Sample testimonials seeded (pre-approved — review before publishing)');
        }

        console.log('✅ Seeding complete');
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
    }
}

module.exports = { seedIfEmpty };
