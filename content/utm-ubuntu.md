---
title: "Ubuntu 22.04 with UTM"
---
- No easy way to dual boot with the M1 chips -- UTM is a software specifically for macOS to run VMs or emulate other machines
- How to create a new Ubuntu VM:
    - Install the 22.04 live server arm64 ISO image
    - Start > Virtualize > Other and select the ISO image
    - Create a new NVMe drive for 20GB
    - Go through Ubuntu setup
- Installing GNOME desktop environment
    - `sudo apt update && sudo apt upgrade`
    - `sudo apt install ubuntu-gnome-desktop`
    - `reboot`

Articles that I used:
- https://bytexd.com/how-to-install-gnome-desktop-in-ubuntu/
- the beginning of this video https://youtu.be/GjqeoC267FM
- the middle of this video https://youtu.be/hnwK-nkXolc

Updated 7/23: You can run an Ubuntu VM using Xcode with [this](https://developer.apple.com/documentation/virtualization/creating_and_running_a_linux_virtual_machine) tutorial 