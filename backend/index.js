import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Donation, Fundriser, User } from './Schemas.js';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const PORT = 6001;

mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'fundtastic-reference',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected');

        app.post('/register', async (req, res) => {
            try {
                const { username, email, password, usertype } = req.body;
        
                // Check if the email is already registered
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({ message: "Email already registered" }); // 409 Conflict
                }
        
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
        
                const newUser = new User({
                    username,
                    email,
                    password: passwordHash,
                    usertype
                });
        
                const user = await newUser.save();
        
                res.status(201).json(user); // 201 Created
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        
        app.post('/login', async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
                }
        
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
                }
        
                res.status(200).json(user);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.post('/new-fundriser', async (req, res) => {
            const { applicantId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3, collectedAmount } = req.body;
            try {
                const fundDetails = new Fundriser({ applicantId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3, collectedAmount });
                await fundDetails.save();

                res.status(200).json(fundDetails);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.post('/update-fundriser', async (req, res) => {
            const { fundriserId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3 } = req.body; //Removed applicantId from update.
            try {
                const fundDetails = await Fundriser.findById(fundriserId);

                if (!fundDetails) {
                    return res.status(404).json({ message: "Fundriser not found" });
                }

                fundDetails.applicantName = applicantName;
                fundDetails.applicantEmail = applicantEmail;
                fundDetails.applicantMobile = applicantMobile;
                fundDetails.fundriserPurpose = fundriserPurpose;
                fundDetails.title = title;
                fundDetails.description = description;
                fundDetails.bannerImage = bannerImage;
                fundDetails.deadline = deadline;
                fundDetails.targetAmount = targetAmount;
                fundDetails.extraImg1 = extraImg1;
                fundDetails.extraImg2 = extraImg2;
                fundDetails.extraImg3 = extraImg3;

                await fundDetails.save();

                res.status(200).json(fundDetails);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/fetch-fundrisers', async (req, res) => {
            try {
                const fundrisers = await Fundriser.find();
                res.status(200).json(fundrisers);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/fetch-fundriser/:id', async (req, res) => {
            try {
                const fundriser = await Fundriser.findById(req.params.id);
                if (!fundriser) {
                    return res.status(404).json({ message: "Fundriser not found" });
                }
                res.status(200).json(fundriser);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/fetch-donations', async (req, res) => {
            try {
                const donations = await Donation.find();
                res.status(200).json(donations);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.post('/make-donation', async (req, res) => {
            const { donarId, donarName, donarEmail, donationAmount, remark, fundriserId, fundriserPurpose } = req.body;
            try {
                const donation = new Donation({ donarId, donarName, donarEmail, donationAmount, remark, fundriserId, fundriserPurpose });
                await donation.save();

                const fundriser = await Fundriser.findById(fundriserId);
                if (!fundriser) {
                    return res.status(404).json({ message: "Fundriser not found" });
                }
                fundriser.collectedAmount = parseInt(fundriser.collectedAmount) + parseInt(donationAmount);
                await fundriser.save();

                res.status(200).json(donation);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/fetch-users', async (req, res) => {
            try {
                const users = await User.find();
                res.status(200).json(users);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.listen(PORT, () => {
            console.log(`Running @ ${PORT}`);
        });
    })
    .catch((e) => console.log(`Error in db connection ${e}`));