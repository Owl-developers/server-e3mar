import {Resolver, Query, ObjectType, Field, Arg, InputType, ArgsType, Args,ArgOptions, ID, Int, Mutation, Ctx, Authorized, UseMiddleware } from "type-graphql"
import {User,Context, RegisterInput, LoginArgs} from '../types/user.types'
import UserModel from '../models/Users'
import RolesModel from '../../Roles/models/Roles'
import RolesPermissions from "../../RolesPermissions/models/RolesPermissions"
import PermissionsModel from "../../Permissions/models/Permissions"
import { errorHandler } from "../middleware/user.error"
import { GraphQLError } from "graphql"
import { generateToken, throwKnownError } from "../../helper"
import bcrypt from "bcryptjs"

async function test() {
    // const manager = await RolesModel.findOne({roleName: "manager"})


    // const
    // console.log(p)
    // await PermissionsModel.insertMany(permissions)
    // await RolesModel.insertOne(
    //     {roleName: 'worker'}, 

    // )
    // const user = await UserModel.insertOne({
    //     username: "awd",
    //     password: "awd",
    //     email: "awd",
    //     phone: "awd",
    //     role_id: manager._id,
    // })
    try {
        // const user = await UserModel.findOne({username: "awd"}).populate({path: "role_id"})
        // const rolesPermissions = await RolesPermissions.find().populate({path: "permission_id"})
        // const user = await UserModel.findOne({username: "awd2"}).getPopulatedPaths()
        // console.log(user)
        // console.log(rolesPermissions)
        
    } catch (err) {
        console.log("err", err)
    }
    console.log('111')
}
const users = [
    {
      username: "john_doe",
      password: "secure123",
      phone: "555-0101",
      email: "john@example.com",
      imageUrl: "https://example.com/john.jpg",
      isSuperAdmin: false
    },
    {
      username: "jane_smith",
      password: "pass1234",
      phone: "555-0102",
      email: "jane@example.com",
      imageUrl: "",
      isSuperAdmin: true
    },
    {
      username: "alex_wong",
      password: "alex2023",
      phone: "555-0103",
      email: "alex@example.com",
      isSuperAdmin: false
    },
    {
      username: "sara_jones",
      password: "sara456",
      phone: "555-0104",
      email: "sara@example.com",
      imageUrl: "https://example.com/sara.png"
    },
    {
      username: "mike_brown",
      password: "mike789",
      phone: "555-0105",
      email: "mike@example.com",
      isSuperAdmin: false
    },
    {
      username: "emily_davis",
      password: "emily101",
      phone: "555-0106",
      email: "emily@example.com",
      imageUrl: "https://example.com/emily.jpg"
    },
    {
      username: "david_wilson",
      password: "david2023",
      phone: "555-0107",
      email: "david@example.com",
      isSuperAdmin: true
    },
    {
      username: "lisa_taylor",
      password: "lisa123",
      phone: "555-0108",
      email: "lisa@example.com"
    },
    {
      username: "ryan_miller",
      password: "ryan456",
      phone: "555-0109",
      email: "ryan@example.com",
      imageUrl: "https://example.com/ryan.png"
    },
    {
      username: "olivia_anderson",
      password: "olivia789",
      phone: "555-0110",
      email: "olivia@example.com",
      isSuperAdmin: false
    },
    {
      username: "tech_guru",
      password: "admin123",
      phone: "555-0111",
      email: "admin@example.com",
      isSuperAdmin: true
    },
    {
      username: "web_dev",
      password: "dev2023",
      phone: "555-0112",
      email: "dev@example.com",
      imageUrl: "https://example.com/dev.jpg"
    },
    {
      username: "design_pro",
      password: "design456",
      phone: "555-0113",
      email: "design@example.com"
    },
    {
      username: "data_scientist",
      password: "data789",
      phone: "555-0114",
      email: "data@example.com",
      isSuperAdmin: false
    },
    {
      username: "security_expert",
      password: "secure101",
      phone: "555-0115",
      email: "security@example.com",
      imageUrl: "https://example.com/security.png"
    },
    // Continuing with more users...
    {
      username: "travel_lover",
      password: "travel123",
      phone: "555-0160",
      email: "travel@example.com"
    },
    {
      username: "food_critic",
      password: "food2023",
      phone: "555-0161",
      email: "food@example.com",
      imageUrl: "https://example.com/food.jpg"
    },
    {
      username: "fitness_coach",
      password: "fit456",
      phone: "555-0162",
      email: "fitness@example.com",
      isSuperAdmin: false
    },
    {
      username: "book_worm",
      password: "book789",
      phone: "555-0163",
      email: "books@example.com"
    },
    {
      username: "music_fan",
      password: "music101",
      phone: "555-0164",
      email: "music@example.com",
      imageUrl: "https://example.com/music.png"
    },
    {
        username: "gamer_pro",
        password: "game123",
        phone: "555-0165",
        email: "gamer@example.com",
        imageUrl: "https://example.com/gamer.jpg"
      },
      {
        username: "photo_ninja",
        password: "photo2023",
        phone: "555-0166",
        email: "photo@example.com",
        isSuperAdmin: false
      },
      {
        username: "art_lover",
        password: "art456",
        phone: "555-0167",
        email: "art@example.com"
      },
      {
        username: "movie_buff",
        password: "movie789",
        phone: "555-0168",
        email: "movies@example.com",
        imageUrl: "https://example.com/movies.png"
      },
      {
        username: "science_geek",
        password: "science101",
        phone: "555-0169",
        email: "science@example.com",
        isSuperAdmin: false
      },
      {
        username: "history_nerd",
        password: "history123",
        phone: "555-0170",
        email: "history@example.com"
      },
      {
        username: "nature_lover",
        password: "nature2023",
        phone: "555-0171",
        email: "nature@example.com",
        imageUrl: "https://example.com/nature.jpg"
      },
      {
        username: "pet_care",
        password: "pet456",
        phone: "555-0172",
        email: "pets@example.com",
        isSuperAdmin: false
      },
      {
        username: "car_enthusiast",
        password: "car789",
        phone: "555-0173",
        email: "cars@example.com"
      },
      {
        username: "fashion_icon",
        password: "fashion101",
        phone: "555-0174",
        email: "fashion@example.com",
        imageUrl: "https://example.com/fashion.png"
      },
      {
        username: "tech_wizard",
        password: "tech123",
        phone: "555-0175",
        email: "tech@example.com",
        isSuperAdmin: true
      },
      {
        username: "coffee_snob",
        password: "coffee2023",
        phone: "555-0176",
        email: "coffee@example.com"
      },
      {
        username: "wine_connoisseur",
        password: "wine456",
        phone: "555-0177",
        email: "wine@example.com",
        imageUrl: "https://example.com/wine.jpg"
      },
      {
        username: "fitness_guru",
        password: "fit789",
        phone: "555-0178",
        email: "fit@example.com",
        isSuperAdmin: false
      },
      {
        username: "yoga_master",
        password: "yoga101",
        phone: "555-0179",
        email: "yoga@example.com"
      },
      {
        username: "coding_ninja",
        password: "code123",
        phone: "555-0180",
        email: "code@example.com",
        imageUrl: "https://example.com/code.png"
      },
      {
        username: "startup_founder",
        password: "start2023",
        phone: "555-0181",
        email: "startup@example.com",
        isSuperAdmin: false
      },
      {
        username: "investor_pro",
        password: "invest456",
        phone: "555-0182",
        email: "invest@example.com"
      },
      {
        username: "finance_expert",
        password: "finance789",
        phone: "555-0183",
        email: "finance@example.com",
        imageUrl: "https://example.com/finance.jpg"
      },
      {
        username: "real_estate",
        password: "real101",
        phone: "555-0184",
        email: "realestate@example.com",
        isSuperAdmin: false
      },
      {
        username: "architect_1",
        password: "arch123",
        phone: "555-0185",
        email: "architect@example.com"
      },
      {
        username: "interior_design",
        password: "design2023",
        phone: "555-0186",
        email: "interior@example.com",
        imageUrl: "https://example.com/interior.png"
      },
      {
        username: "graphic_designer",
        password: "graphic456",
        phone: "555-0187",
        email: "graphic@example.com",
        isSuperAdmin: false
      },
      {
        username: "ui_ux_pro",
        password: "uiux789",
        phone: "555-0188",
        email: "uiux@example.com"
      },
      {
        username: "marketing_guru",
        password: "market101",
        phone: "555-0189",
        email: "marketing@example.com",
        imageUrl: "https://example.com/marketing.jpg"
      },
      {
        username: "social_media",
        password: "social123",
        phone: "555-0190",
        email: "social@example.com",
        isSuperAdmin: false
      },
      {
        username: "content_creator",
        password: "content2023",
        phone: "555-0191",
        email: "content@example.com"
      },
      {
        username: "video_editor",
        password: "video456",
        phone: "555-0192",
        email: "video@example.com",
        imageUrl: "https://example.com/video.png"
      },
      {
        username: "podcast_host",
        password: "podcast789",
        phone: "555-0193",
        email: "podcast@example.com",
        isSuperAdmin: false
      },
      {
        username: "writer_pro",
        password: "write101",
        phone: "555-0194",
        email: "writer@example.com"
      },
      {
        username: "journalist_1",
        password: "news123",
        phone: "555-0195",
        email: "news@example.com",
        imageUrl: "https://example.com/news.jpg"
      },
      {
        username: "teacher_math",
        password: "math2023",
        phone: "555-0196",
        email: "math@example.com",
        isSuperAdmin: false
      },
      {
        username: "professor_sci",
        password: "science456",
        phone: "555-0197",
        email: "professor@example.com"
      },
      {
        username: "student_1",
        password: "study789",
        phone: "555-0198",
        email: "student@example.com",
        imageUrl: "https://example.com/student.png"
      },
      {
        username: "researcher_1",
        password: "research101",
        phone: "555-0199",
        email: "research@example.com",
        isSuperAdmin: false
      },
      {
        username: "doctor_1",
        password: "doc123",
        phone: "555-0200",
        email: "doctor@example.com"
      },
      {
        username: "nurse_pro",
        password: "nurse2023",
        phone: "555-0201",
        email: "nurse@example.com",
        imageUrl: "https://example.com/nurse.jpg"
      },
      {
        username: "engineer_1",
        password: "engineer456",
        phone: "555-0202",
        email: "engineer@example.com",
        isSuperAdmin: false
      },
      {
        username: "mechanic_1",
        password: "mechanic789",
        phone: "555-0203",
        email: "mechanic@example.com"
      },
      {
        username: "electrician_1",
        password: "electric101",
        phone: "555-0204",
        email: "electric@example.com",
        imageUrl: "https://example.com/electric.png"
      },
      {
        username: "plumber_1",
        password: "plumb123",
        phone: "555-0205",
        email: "plumber@example.com",
        isSuperAdmin: false
      },
      {
        username: "carpenter_1",
        password: "wood2023",
        phone: "555-0206",
        email: "carpenter@example.com"
      },
      {
        username: "chef_pro",
        password: "chef456",
        phone: "555-0207",
        email: "chef@example.com",
        imageUrl: "https://example.com/chef.jpg"
      },
      {
        username: "baker_1",
        password: "bake789",
        phone: "555-0208",
        email: "baker@example.com",
        isSuperAdmin: false
      },
      {
        username: "barista_1",
        password: "coffee101",
        phone: "555-0209",
        email: "barista@example.com"
      },
      {
        username: "farmer_1",
        password: "farm123",
        phone: "555-0210",
        email: "farmer@example.com",
        imageUrl: "https://example.com/farmer.png"
      },
      {
        username: "gardener_1",
        password: "garden2023",
        phone: "555-0211",
        email: "gardener@example.com",
        isSuperAdmin: false
      },
      {
        username: "vet_1",
        password: "vet456",
        phone: "555-0212",
        email: "vet@example.com"
      },
      {
        username: "pilot_1",
        password: "fly789",
        phone: "555-0213",
        email: "pilot@example.com",
        imageUrl: "https://example.com/pilot.jpg"
      },
      {
        username: "flight_attendant",
        password: "fly101",
        phone: "555-0214",
        email: "flight@example.com",
        isSuperAdmin: false
      },
      {
        username: "sailor_1",
        password: "sail123",
        phone: "555-0215",
        email: "sailor@example.com"
      },
      {
        username: "driver_1",
        password: "drive2023",
        phone: "555-0216",
        email: "driver@example.com",
        imageUrl: "https://example.com/driver.png"
      },
      {
        username: "police_1",
        password: "police456",
        phone: "555-0217",
        email: "police@example.com",
        isSuperAdmin: false
      },
      {
        username: "firefighter_1",
        password: "fire789",
        phone: "555-0218",
        email: "fire@example.com"
      },
      {
        username: "soldier_1",
        password: "army101",
        phone: "555-0219",
        email: "army@example.com",
        imageUrl: "https://example.com/army.jpg"
      },
      {
        username: "lawyer_1",
        password: "law123",
        phone: "555-0220",
        email: "lawyer@example.com",
        isSuperAdmin: false
      },
      {
        username: "judge_1",
        password: "judge2023",
        phone: "555-0221",
        email: "judge@example.com"
      },
      {
        username: "accountant_1",
        password: "account456",
        phone: "555-0222",
        email: "accountant@example.com",
        imageUrl: "https://example.com/accountant.png"
      },
      {
        username: "consultant_1",
        password: "consult789",
        phone: "555-0223",
        email: "consultant@example.com",
        isSuperAdmin: false
      },
      {
        username: "hr_manager",
        password: "hr101",
        phone: "555-0224",
        email: "hr@example.com"
      },
      {
        username: "recruiter_1",
        password: "recruit123",
        phone: "555-0225",
        email: "recruiter@example.com",
        imageUrl: "https://example.com/recruiter.jpg"
      },
      {
        username: "ceo_1",
        password: "ceo2023",
        phone: "555-0226",
        email: "ceo@example.com",
        isSuperAdmin: true
      },
      {
        username: "cto_1",
        password: "cto456",
        phone: "555-0227",
        email: "cto@example.com"
      },
      {
        username: "cfo_1",
        password: "cfo789",
        phone: "555-0228",
        email: "cfo@example.com",
        imageUrl: "https://example.com/cfo.png"
      },
      {
        username: "manager_1",
        password: "manage101",
        phone: "555-0229",
        email: "manager@example.com",
        isSuperAdmin: false
      },
      {
        username: "director_1",
        password: "direct123",
        phone: "555-0230",
        email: "director@example.com"
      },
      {
        username: "executive_1",
        password: "exec2023",
        phone: "555-0231",
        email: "exec@example.com",
        imageUrl: "https://example.com/exec.jpg"
      },
      {
        username: "entrepreneur_1",
        password: "entre456",
        phone: "555-0232",
        email: "entrepreneur@example.com",
        isSuperAdmin: false
      },
      {
        username: "founder_1",
        password: "found789",
        phone: "555-0233",
        email: "founder@example.com"
      },
      {
        username: "investor_1",
        password: "invest101",
        phone: "555-0234",
        email: "investor@example.com",
        imageUrl: "https://example.com/investor.png"
      },
      {
        username: "angel_investor",
        password: "angel123",
        phone: "555-0235",
        email: "angel@example.com",
        isSuperAdmin: false
      },
      {
        username: "vc_1",
        password: "vc2023",
        phone: "555-0236",
        email: "vc@example.com"
      },
      {
        username: "board_member",
        password: "board456",
        phone: "555-0237",
        email: "board@example.com",
        imageUrl: "https://example.com/board.jpg"
      },
      {
        username: "shareholder_1",
        password: "share789",
        phone: "555-0238",
        email: "shareholder@example.com",
        isSuperAdmin: false
      },
      {
        username: "analyst_1",
        password: "analyze101",
        phone: "555-0239",
        email: "analyst@example.com"
      },
      {
        username: "trader_1",
        password: "trade123",
        phone: "555-0240",
        email: "trader@example.com",
        imageUrl: "https://example.com/trader.png"
      },
      {
        username: "broker_1",
        password: "broker2023",
        phone: "555-0241",
        email: "broker@example.com",
        isSuperAdmin: false
      },
      {
        username: "agent_1",
        password: "agent456",
        phone: "555-0242",
        email: "agent@example.com"
      },
      {
        username: "realtor_1",
        password: "realty789",
        phone: "555-0243",
        email: "realtor@example.com",
        imageUrl: "https://example.com/realtor.jpg"
      },
      {
        username: "developer_1",
        password: "dev101",
        phone: "555-0244",
        email: "developer@example.com",
        isSuperAdmin: false
      }
];
  

// @UseMiddleware(errorHandler)
@Resolver(User)
export class UserResolvers {
    @UseMiddleware(errorHandler)
    @Query((returns) => User, {nullable: true})
    async login(@Ctx() {req, res}: Context, @Args() {username,password, email}: LoginArgs):Promise<User | null> {
        console.log("login user resolvers")
        const user = await UserModel.findOne({username, email})
        
        console.log()
        if(!user) {
            throw throwKnownError(404, 'user not found')
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        console.log(correctPassword)
        if(!correctPassword) {
            throw throwKnownError(404, 'user not found')
        }
        console.log(user)
        console.log()
        console.log(req.cookies)
        const token = generateToken(user)
        res.cookie("token", token, { path: "/", secure: true, httpOnly: true })
        return user
    }
    @Mutation(()=> User)
    @UseMiddleware(errorHandler)
    async register(@Ctx() {req, res}: Context ,@Arg("input") input: RegisterInput):Promise <User | string> {
        const {username, password, email, phone} = input
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            username,
            password: hashedPassword,
            email,
            phone,
        })
        console.log(user)
        const token = generateToken(user)
        res.cookie("token", token, { path: "/", secure: true, httpOnly: true })
        return user
    }

}