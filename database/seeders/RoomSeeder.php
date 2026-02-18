<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            [
                'name' => 'Auditorium 5th Floor',
                'desc' => 'A multipurpose room located on the 5th floor of the main building. This room is designed for various events and activities, ranging from meetings and seminars to social events. Equipped with adequate facilities such as a sound system, projector, and spacious room, the 5th Floor Auditorium provides a comfortable and flexible venue for various organizational and academic activities. This room is designed for various events and activities, ranging from meetings, seminars, to social events. Equipped with adequate facilities such as a sound system, projector, and spacious room, the 5th Floor Auditorium provides a comfortable and flexible place for various organizational and academic activities.',
                'status' => 'available'
            ],
            [
                'name' => 'Classroom 3.1',
                'desc' => 'Classroom 3.1 is a classroom located on the 3rd floor of the main building. This room is designed for learning and group discussions. Equipped with comfortable desks and chairs, a blackboard, and technological facilities such as a projector and internet connection, Classroom 3.1 provides a conducive environment for the learning process. With sufficient capacity to accommodate a number of students, Classroom 3.1 is an ideal place for various academic activities, including lectures, seminars, and workshops.',
                'status' => 'available'
            ],
            [
                'name' => 'Classroom 3.2',
                'desc' => 'Classroom 3.2 is a classroom located on the 3rd floor of the main building. This room is designed for learning and group discussions. Equipped with comfortable desks and chairs, a blackboard, and technological facilities such as a projector and internet connection, Classroom 3.2 provides a conducive environment for the learning process. With sufficient capacity to accommodate a number of students, Classroom 3.2 is an ideal place for various academic activities, including lectures, seminars, and workshops.',
                'status' => 'available'
            ],
            [
                'name' => 'Classroom 3.3',
                'desc' => 'Classroom 3.3 is a classroom located on the 3rd floor of the main building. This room is designed for learning and group discussions. Equipped with comfortable desks and chairs, a blackboard, and technological facilities such as a projector and internet connection, Classroom 3.3 provides a conducive environment for the learning process. With sufficient capacity to accommodate a number of students, Classroom 3.3 is an ideal place for various academic activities, including lectures, seminars, and workshops.',
                'status' => 'available'
            ],
            [
                'name' => 'Classroom 3.4',
                'desc' => 'Classroom 3.4 is a classroom located on the 3rd floor of the main building. This room is designed for learning and group discussions. Equipped with comfortable desks and chairs, a blackboard, and technological facilities such as a projector and internet connection, Classroom 3.4 provides a conducive environment for the learning process. With sufficient capacity to accommodate a number of students, Classroom 3.4 is an ideal place for various academic activities, including lectures, seminars, and workshops.',
                'status' => 'available'
            ],
            [
                'name' => 'Digistar Room Lt. 4',
                'desc' => 'Digistar Room Lt. 4 is a digital learning classroom located on the 4th floor of the main building. This room is designed for learning activities that utilize digital technology. Equipped with advanced facilities such as digital projectors, interactive screens, and fast internet connectivity, Digistar Room Lt. 4 provides a modern and innovative environment for the learning process. With sufficient capacity to accommodate a number of students, Digistar Room Lt. 4 is an ideal place for various academic activities, including lectures, seminars, and workshops that leverage digital technology to enhance the learning experience.',
            ],
            [
                'name' => 'Aula 2nd Floor',
                'desc' => 'Aula 2nd Floor is a multi-purpose room located on the 2nd floor of the main building. This room is designed for various events and activities, ranging from meetings and seminars to social events. Equipped with adequate facilities such as a sound system, projector, and spacious area, Aula 2nd Floor provides a comfortable and flexible space for various organizational and academic activities.',
                'status' => 'available'
            ]
        ];

        foreach($rooms as $room) {
            \App\Models\Room::create($room);
        }
    }
}
