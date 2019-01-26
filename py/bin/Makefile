CXXFLAGS=-DRPI

all: sniffer

sniffer: ../helper/rc-switch/RCSwitch.o sniffer.o
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $+ -o $@ -lwiringPi -lwiringPiDev -lcrypt

clean:
	$(RM) ../helper/rc-switch/*.o *.o sniffer
