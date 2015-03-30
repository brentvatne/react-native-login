#import "RCTVideoPlayerManager.h"
#import "RCTVideoPlayer.h"
#import "RCTBridge.h"

@implementation RCTVideoPlayerManager

@synthesize bridge = _bridge;

- (UIView *)view
{
    return [[RCTVideoPlayer alloc] initWithEventDispatcher:_bridge.eventDispatcher];
}

RCT_CUSTOM_VIEW_PROPERTY(src, NSString, RCTVideoPlayer)
{
    if (json) {
        [view initFromSource:[RCTConvert NSString:json]];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(resizeMode, NSInteger, RCTVideoPlayer)
{
    [view setResizeMode:[RCTConvert NSInteger:json]];
}


@end
