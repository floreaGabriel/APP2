import User from '../models/user.model.js'


export const getUserDashboard = async (req,res) => {
    try {

        const userId = req.user._id;

        const user = await User.findById(userId)
            .select('-password')
            .lean();
        
        if (!user)
        {
            return res.status(404).json({
                succes: false,
                message: 'Utilizatorul nu a fost gasit'
            });
        }

        let dashboardData = {
            userInfo: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles
            }
        };

        // Adăugăm date specifice în funcție de rol
        if (user.roles.includes('PARTICIPANT')) {
            dashboardData.participant = {
                savedEvents: user.participantProfile?.savedEvents || [],
                attendedEvents: user.participantProfile?.attendedEvents || [],
                preferences: user.participantProfile?.preferences || {}
            };
        }

        if (user.roles.includes('ORGANIZER')) {
            dashboardData.organizer = {
                companyName: user.organizerProfile?.companyName,
                events: user.organizerProfile?.events || {},
                rating: user.organizerProfile?.rating || {},
                statistics: user.organizerProfile?.statistics || {}
            };
        }

        res.status(200).json({
            success: true,
            data: dashboardData
        });


    } catch(error)
    {
        console.error('Error in getUserDashboard:', error);
        res.status(500).json({
            success: false,
            message: 'Eroare la încărcarea dashboard-ului',
            error: error.message
        });
    }

}