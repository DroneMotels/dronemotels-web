# DroneMotels Basic Concept
Dronemotels are a way of dealing with the growing counts of privately owned drones. There will be more and more and they will get cheaper and cheaper. But the main problem is distance. After give or take 10 minutes your battery is going to be empty and you might have to return or land. What you would need is a place you would fly to, within a 10 min radius of your starting point, to charge your drone. Best would be a safe and supervised place. After it's charged you could continue your journey and as long as there is a place like that within your action-radius you could go on forever. 

This project is solving exaclty that problem. Its supposed to be a open-source, low-cost, easy to build, *you can put it anywhere* solution. And it's not just one solution, its an idea. Its the idea of having a space, in your available space, you rent out to drones. And the good thing, you dont even have to own a drone. The easiest, most bare bone form of such a motel would be a 50x50cm board on the ground in your garden or on your balcony. It just has to be safe from predators. But you have to admit, that would be more of a parking spot then a motel. A motel usually has a roof, power and internet. And as more service your motel delivers as more you can charge for staying in it. 

Lets think about ground-drones for a moment. You would have to have a place that has some sort of ground access. Lets keep it simple and use the front yard. You put a box there ~30x30x30cm with a door that can be opened so a ground-drone car could easily drive in it. Inside the box is a servo-motor that controls the door, a low cost/low power computer and a wifi dongle. Underneath the parking space in the box is an inductive charging pad fitting to the drones charging pad. One day a drone drives on your frontyard connects to the box's wifi, opens the box's door, drives inside the box, closes the door. After its charged it will leave your box the same way it got in, on its own. And thats it. 

This is just one way of achieving the goal, but there are uncountable ways of dealing with this, as there are different drones to deal with. If you have a place at water you might use a peer for a drone-boat. If you have a room on the 5th floor with just one window or a balcony, you might have place for a small heli pad for a quadcoper. 

The idea of this project is to keep it simple for anybody to deploy a motel. You shouldn't need to be an electronics professional to be able to get a motel goin. Thats why there are 3 main parts to this. The housing, the connector and the system. You might build you own housing but you can make use of open connectors and systems other people made. But if you are good at systems you might get your housing from somebody else, build it with your friends, or you go all in and do it all yourself, or you just get the whole thing fully assembled. Everything goes.

This will be a place where you can share your part or publish/advertise your own motel. Where the community can discuss and grow and where drone operators can find motels to rent on their journeys.

## Housing
The housing is the motel building. This can be anything you can imagine from the real world and beyond, from a single parking spot or a single garage to a multi floor parking garage, a single peer to a haven, from a birdhouse or a heli pad to an multi hangar airport. You might even go stealth and put it underground or behind secret doors. In essence, everything is possible. Just keep in mind that a drone needs to be able to get in and out without the help of a human hand. 
#####Sizes
In the future there is no way around providing housings for different sizes of drones. In the city, drones can be small, because the distance to the next motel might be very short and there are more of them. In the countryside however, drones can and will be larger because they can and they will need more power to reach the next motel. We might however start with a reasonable inside space of 20x20x20 as a "default" to have some compatibility. Also it's not too small and not too big to transport. Housings will be categoriesed by size, so later on it should be easy to find a fitting motel for your vehicle.

##Connector
The connector or connector-system should be an ingenious way of connecting a drone to a housing without human intervention. Induction charging might be one way but there must be others. Just make sure you build a complete system, so its clear how to mount it in the housing and the drone and what power its charging or what cable is doing what. 
#####Power
It might be reasonable to start with charging connectors, as its the most essential part of function of the motel. We should start with the "default" of 5V and 12V and maybe work our way up or down later as more and more drones emerge. For low power drones inductive charging might be ok, but as they need more power a more stable direkt connection might be better.
#####Network
As wifi is the easiest way of making a network connection between the motel and the drone it's one of the unsafest too. Outsiders could sniff and we might want to keep the things private. Thats why "hardwired" connections are essential. Ethernet cables usually need a human hand, so what different ways are there to make this connection safely. Maybe use a laser link. 

##System
The system is the brains of your motel. It talks to the drone, controls the doors and lays the connections. The doors might have their own system, but this "main system" is controling when what happens.
#####Owner/Boss/Admin
The interface for the boss of the motel. You can see if the room is occupied and who rented it, how long they booked it and if anybody needs anything. Door maintainance and small security can be handled here. Think small hotel, where the receptionist is maynly doing everything. In bigger motels things might get split into smaller groups, for example security for the parking space might have its own interface.
#####Employees
That might be remote-security guards or cleaning shifts. It might even be controlled by a completly seperate autonomous system, administered by the motel boss.
#####Client/User
The client interface gives the client control over the applicable room features like main room door, the room camera, battery charge control/status, network status, wifi credentials, ip, vpn, rental status/costs, temperature, outside camera, reception chat and other services that are available in that particular motel. 

> Clients expect good service in a motel, be a good boss :) 

***

##Documentation
Try to document your build, so others can appreciate their stay much more. If you feel that you want to share your build, put it on thingiverse or other ways of making it possible for others to repeat your housing. You could even take orders and build the same housing again for others. Or give out 3d files so everyone can print them themselfs or let it print somewhere else. More open, more better.

***

***


#Basic web/hub roadmap **dronemotels.com**:

###v1.0:
- info
- chat
  - irc.dronemotels.com
- user generated content(imgs/txt/comments):
  - housings
  - connectors
  - systems
  - motels
- motels map
- featured Motels
- blog

###v2.0:
- motel-api   
  - api.dronemotels.com
  - booking-status
  - price
  - live
    - cam
    - temp
    - wind

###v3.0:...




