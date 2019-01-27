CXXFLAGS=-DRPI

all: sniffer send set

sniffer: ../helper/rc-switch/RCSwitch.o sniffer.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt

send: ../helper/rc-switch/RCSwitch.o send.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt

set: ../helper/rc-switch/RCSwitch.o set.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt

clean:
	$(RM) ../helper/rc-switch/*.o *.o sniffer send set
