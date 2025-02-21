import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} nu este un email valid!`
        }
    },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    roles: [{ type: String, enum: ['PARTICIPANT', 'ORGANIZER', 'ADMIN']}],
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
    avatar: String,

    // doar pentru participanti

    participantProfile: {
        preferences: {
            eventTypes: [String],
            locations: [String],
            priceRange: {
                min: Number,
                max: Number
            }
        },
        savedEvents: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Event'
        }],
        attendedEvents: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Event'
        }],
        contactInfo: {
            phone: String,
            address: {
                street: String,
                city: String,
                country: String,
                postalCode: String
            }
        },
        socialMedia: {
            linkedin: String,
            facebook: String,
            instagram: String
        },
        description: String
    },

    // doar pentru organizatori

    organizerProfile: {
        // info de baza
        companyName: String,
        description: String,
        verificationStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
        // evenimente si statistici
        events: {
            active: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
            past: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
            draft: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
            totalEvents: {type: Number, default: 0}
        },
        // abonamente si rating
        subscriptionPlan: {
            type: String,
            enum: ['FREE', 'PREMIUM', 'ENTERPRISE'],
            default: 'FREE'
        },
        rating: {
            average: {type: Number, default: 0},
            count: {type: Number, default: 0}
        },
        statistics: {
            totalParticipants: {type: Number, default: 0},
            totalRevenue: {type: Number, default: 0}
        },
         // Specializari si categorii
        eventCategories: [String], // Ex: ["Tech", "Business", "Educational"]
        expertise: [String],       // Ex: ["Conferences", "Workshops", "Seminars"]
    
        // contact 
        contactInfo: {
            businessEmail: String,
            phone: String,
            website: String,
            socialMedia: {
                linkedin: String,
                facebook: String,
                instagram: String
            }
        },
        resource: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource'
        }],

        // Calendar si disponibilitate
        availability: {
            workingHours: {
                start: String,
                end: String
            },
            timezone: String,
            unavailableDates: [Date]
        },
        // Feedback și review-uri
        reviews: [{
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            rating: Number,
            comment: String,
            date: Date
        }],
        // Documente și certificări
        documents: [{
            type: String,
            name: String,
            url: String,
            verified: Boolean
        }]
    },

    settings: {
        language: { type: String, default: 'RO' },
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        }
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;